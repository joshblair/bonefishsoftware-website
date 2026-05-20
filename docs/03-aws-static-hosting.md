# Static Site Hosting on AWS — S3, CloudFront, ACM, and Route 53

**Series:** Building bonefishsoftware.com from scratch  
**Author:** Josh Blair

---

## Overview

This article covers deploying a static React site to AWS using S3 as the origin, CloudFront as the CDN, ACM for TLS certificates, and Route 53 for DNS. Everything is defined as CloudFormation infrastructure-as-code.

## Architecture

![Static hosting architecture](diagrams/bonefish-software-site-architecture.png)

---

## CloudFormation Infrastructure

The hosting infrastructure is split across **three stacks** deployed in sequence:

| Stack | File | Region | Purpose |
|---|---|---|---|
| `bonefish-acm` | `infra/acm/certificate.yml` | **us-east-1** | ACM TLS certificate |
| `bonefish-website` | `infra/stacks/website.yml` | us-west-2 | S3 + CloudFront |
| `bonefish-pipeline` | `infra/stacks/pipeline.yml` | us-west-2 | CI/CD (covered in article 4) |

---

## ACM Certificate (us-east-1)

> **Why us-east-1?** CloudFront is a global service that only accepts ACM certificates provisioned in `us-east-1`. This is an AWS requirement regardless of where your other resources live.

```yaml
# infra/acm/certificate.yml
Resources:
  Certificate:
    Type: AWS::CertificateManager::Certificate
    Properties:
      DomainName: bonefishsoftware.com
      SubjectAlternativeNames:
        - www.bonefishsoftware.com
      ValidationMethod: DNS
```

**DNS validation:** ACM generates two CNAME records that must be added to your DNS zone. Because the domain is managed by Route 53, we added these via CLI:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id $ZONE_ID \
  --change-batch '{ "Changes": [
    { "Action": "UPSERT", "ResourceRecordSet": {
      "Name": "_bf48ff...bonefishsoftware.com.",
      "Type": "CNAME", "TTL": 300,
      "ResourceRecords": [{"Value": "_ea68....acm-validations.aws."}]
    }}
  ]}'
```

Once the domain's nameservers resolve correctly, ACM validates automatically (typically 2–5 minutes).

---

## S3 Bucket

The S3 bucket is **private** — no public access whatsoever. CloudFront accesses it via OAC (Origin Access Control).

```yaml
WebsiteBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: bonefishsoftware-com-website
    VersioningConfiguration:
      Status: Enabled
    PublicAccessBlockConfiguration:
      BlockPublicAcls: true
      BlockPublicPolicy: true
      IgnorePublicAcls: true
      RestrictPublicBuckets: true
```

### Bucket Policy — allow CloudFront OAC only

```yaml
WebsiteBucketPolicy:
  Type: AWS::S3::BucketPolicy
  Properties:
    Bucket: !Ref WebsiteBucket
    PolicyDocument:
      Statement:
        - Effect: Allow
          Principal:
            Service: cloudfront.amazonaws.com
          Action: s3:GetObject
          Resource: !Sub '${WebsiteBucket.Arn}/*'
          Condition:
            StringEquals:
              AWS:SourceArn: !Sub >-
                arn:aws:cloudfront::${AWS::AccountId}:distribution/${Distribution}
```

The `AWS:SourceArn` condition means only our specific CloudFront distribution can read from this bucket — not any other CloudFront distribution in any AWS account.

---

## Origin Access Control (OAC)

OAC is the modern replacement for Origin Access Identity (OAI). Key advantages:
- Supports all S3 API operations
- Works with SSE-KMS encrypted buckets
- Uses AWS SigV4 request signing (more secure)

```yaml
OriginAccessControl:
  Type: AWS::CloudFront::OriginAccessControl
  Properties:
    OriginAccessControlConfig:
      Name: bonefishsoftware-com-oac
      OriginAccessControlOriginType: s3
      SigningBehavior: always
      SigningProtocol: sigv4
```

---

## CloudFront Distribution

```yaml
Distribution:
  Type: AWS::CloudFront::Distribution
  Properties:
    DistributionConfig:
      Enabled: true
      DefaultRootObject: index.html
      Aliases:
        - bonefishsoftware.com
        - www.bonefishsoftware.com
      ViewerCertificate:
        AcmCertificateArn: !Ref CertificateArn
        SslSupportMethod: sni-only
        MinimumProtocolVersion: TLSv1.2_2021
      HttpVersion: http2and3
      Origins:
        - Id: S3Origin
          DomainName: !GetAtt WebsiteBucket.RegionalDomainName
          S3OriginConfig:
            OriginAccessIdentity: ''
          OriginAccessControlId: !GetAtt OriginAccessControl.Id
      DefaultCacheBehavior:
        TargetOriginId: S3Origin
        ViewerProtocolPolicy: redirect-to-https
        CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6  # CachingOptimized
        Compress: true
      CustomErrorResponses:
        - ErrorCode: 403
          ResponseCode: 200
          ResponsePagePath: /index.html
          ErrorCachingMinTTL: 0
        - ErrorCode: 404
          ResponseCode: 200
          ResponsePagePath: /index.html
          ErrorCachingMinTTL: 0
      PriceClass: PriceClass_100
```

### Key configuration points

**`RegionalDomainName` not `DomainName`**  
Always use `WebsiteBucket.RegionalDomainName` (e.g. `bucket.s3.us-west-2.amazonaws.com`) when configuring an S3 origin with OAC. Using the global `DomainName` can cause redirect loops.

**`PriceClass_100`**  
CloudFront price classes control which edge locations serve your content. `PriceClass_100` covers North America and Europe — the right choice for most US-based businesses. `PriceClass_All` includes Asia/Pacific/South America but costs more.

**`http2and3`**  
Enables HTTP/2 and HTTP/3 (QUIC) — better performance for browsers that support it.

---

## Route 53 DNS Setup

Since the domain is registered in Route 53, nameservers were updated via CLI:

```bash
aws route53domains update-domain-nameservers \
  --domain-name bonefishsoftware.com \
  --region us-east-1 \
  --nameservers \
    Name=ns-1325.awsdns-37.org \
    Name=ns-759.awsdns-30.net \
    Name=ns-1601.awsdns-08.co.uk \
    Name=ns-72.awsdns-09.com
```

Two **Alias records** point the apex domain and `www` to CloudFront:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id $ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "bonefishsoftware.com",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "d39qxh6q0wxdkd.cloudfront.net",
          "EvaluateTargetHealth": false
        }
      }
    }]
  }'
```

> **`Z2FDTNDATAQYW2`** is the fixed Hosted Zone ID for all CloudFront distributions — not specific to yours. Always use this value for CloudFront A alias records.

---

## Deployment Order

The order matters because each stack depends on outputs from the previous:

```
1. Create Route 53 hosted zone
   → Get nameservers, update domain registrar

2. Deploy ACM certificate stack (us-east-1)
   → Add DNS validation CNAMEs to Route 53
   → Wait for ISSUED status (~2–5 min once DNS propagates)

3. Deploy website stack (us-west-2)
   → Pass CertificateArn as parameter
   → Outputs: BucketName, DistributionId, DistributionDomain

4. Deploy pipeline stack (us-west-2)
   → Pass BucketName + DistributionId from step 3
```

---

## Gradual Cutover Strategy

Rather than blocking on the ACM cert, the `website.yml` template supports deploying **without a cert** first:

```yaml
Parameters:
  CertificateArn:
    Type: String
    Default: ''   # ← Leave blank for initial deploy

Conditions:
  HasCustomDomain: !And
    - !Not [!Equals [!Ref CertificateArn, '']]
    - !Not [!Equals [!Ref DomainName, '']]
```

This lets you deploy the full CloudFront + S3 stack immediately, get the CloudFront URL (`*.cloudfront.net`), test it, and then **update the stack** with the cert ARN once it's issued — no downtime, no waiting.

---

## SES DKIM Records

For outbound email from `noreply@bonefishsoftware.com`, three DKIM CNAME records were added to Route 53:

```
jbly6mlsiqbi6h7rnnfthdfkiaxzmvjn._domainkey.bonefishsoftware.com
  → jbly6mlsiqbi6h7rnnfthdfkiaxzmvjn.dkim.amazonses.com

xj7cx3tujwzexkmsxmfruyannxq3sevj._domainkey.bonefishsoftware.com
  → xj7cx3tujwzexkmsxmfruyannxq3sevj.dkim.amazonses.com

fyee6qf6o4fzqiolzxl2dyd4rjboqw4l._domainkey.bonefishsoftware.com
  → fyee6qf6o4fzqiolzxl2dyd4rjboqw4l.dkim.amazonses.com
```

These allow SES to cryptographically sign outbound emails, which improves deliverability and prevents spoofing.
