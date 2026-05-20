# CI/CD with AWS CodePipeline and CodeBuild

**Series:** Building bonefishsoftware.com from scratch  
**Author:** Josh Blair

---

## Overview

Every push to the `main` branch on GitHub automatically builds the React app and deploys it to S3 + CloudFront — zero manual steps. This article covers how that pipeline is wired together using AWS CodePipeline, CodeBuild, and GitHub via CodeStar Connections.

## Pipeline Flow

![CI/CD pipeline](diagrams/ci-cd-pipeline.png)

---

## CloudFormation Stack

The pipeline infrastructure is defined in `infra/stacks/pipeline.yml`.

### CodeStar Connection (GitHub App)

```yaml
GitHubConnection:
  Type: AWS::CodeStarConnections::Connection
  Properties:
    ConnectionName: bonefish-github
    ProviderType: GitHub
```

> **Manual step required:** After deploying the stack, you must go to **AWS Console → CodePipeline → Settings → Connections** and click "Update pending connection" to authorize the GitHub App. This cannot be automated — AWS requires explicit human approval to grant access to your GitHub account.

When authorizing, install the **AWS Connector for GitHub** app on your GitHub account and grant it access to the specific repository. "Connect as a GitHub user" only works for CodeBuild — CodePipeline requires the GitHub App.

### Artifact Bucket

Intermediate pipeline artifacts (source zip, build output) are stored in a private S3 bucket:

```yaml
ArtifactBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: !Sub 'bonefish-pipeline-artifacts-${AWS::AccountId}'
    VersioningConfiguration:
      Status: Enabled
    PublicAccessBlockConfiguration:
      BlockPublicAcls: true
      BlockPublicPolicy: true
      IgnorePublicAcls: true
      RestrictPublicBuckets: true
```

### CodeBuild Project

```yaml
BuildProject:
  Type: AWS::CodeBuild::Project
  Properties:
    Name: bonefish-build
    ServiceRole: !GetAtt CodeBuildRole.Arn
    Artifacts:
      Type: CODEPIPELINE
    Environment:
      Type: LINUX_CONTAINER
      ComputeType: BUILD_GENERAL1_SMALL
      Image: aws/codebuild/standard:7.0
      EnvironmentVariables:
        - Name: S3_BUCKET
          Value: !Ref S3BucketName
        - Name: DISTRIBUTION_ID
          Value: !Ref DistributionId
    Source:
      Type: CODEPIPELINE
      BuildSpec: buildspec.yml
```

### CodePipeline

```yaml
Pipeline:
  Type: AWS::CodePipeline::Pipeline
  Properties:
    Name: bonefish-website-pipeline
    RoleArn: !GetAtt PipelineRole.Arn
    PipelineType: V2
    Stages:
      - Name: Source
        Actions:
          - Name: GitHub
            ActionTypeId:
              Category: Source
              Owner: AWS
              Provider: CodeStarSourceConnection
              Version: '1'
            Configuration:
              ConnectionArn: !Ref GitHubConnection
              FullRepositoryId: !Sub '${GitHubOwner}/${GitHubRepo}'
              BranchName: !Ref GitHubBranch
              DetectChanges: true
            OutputArtifacts:
              - Name: SourceArtifact
      - Name: Build
        Actions:
          - Name: BuildAndDeploy
            ActionTypeId:
              Category: Build
              Owner: AWS
              Provider: CodeBuild
              Version: '1'
            Configuration:
              ProjectName: !Ref BuildProject
            InputArtifacts:
              - Name: SourceArtifact
```

`DetectChanges: true` means CodePipeline automatically triggers on every push to the configured branch — no webhooks to configure manually.

---

## IAM Roles

Two IAM roles are needed: one for CodePipeline, one for CodeBuild.

### CodePipeline Role

```yaml
PipelineRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Statement:
        - Effect: Allow
          Principal:
            Service: codepipeline.amazonaws.com
          Action: sts:AssumeRole
    Policies:
      - PolicyName: PipelinePolicy
        PolicyDocument:
          Statement:
            - Sid: ArtifactBucket
              Effect: Allow
              Action: [s3:GetObject, s3:PutObject, s3:GetObjectVersion, s3:GetBucketVersioning]
              Resource: [!Sub '${ArtifactBucket.Arn}', !Sub '${ArtifactBucket.Arn}/*']
            - Sid: CodeBuild
              Effect: Allow
              Action: [codebuild:BatchGetBuilds, codebuild:StartBuild]
              Resource: !GetAtt BuildProject.Arn
            - Sid: CodeStarConnection
              Effect: Allow
              Action: [codestar-connections:UseConnection]
              Resource: !Ref GitHubConnection
```

### CodeBuild Role

```yaml
CodeBuildRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Statement:
        - Effect: Allow
          Principal:
            Service: codebuild.amazonaws.com
          Action: sts:AssumeRole
    Policies:
      - PolicyName: CodeBuildPolicy
        PolicyDocument:
          Statement:
            - Sid: Logs
              Effect: Allow
              Action: [logs:CreateLogGroup, logs:CreateLogStream, logs:PutLogEvents]
              Resource: '*'
            - Sid: ArtifactBucket
              Effect: Allow
              Action: [s3:GetObject, s3:PutObject, s3:GetObjectVersion]
              Resource: !Sub '${ArtifactBucket.Arn}/*'
            - Sid: WebsiteSync
              Effect: Allow
              Action: [s3:PutObject, s3:DeleteObject, s3:GetObject, s3:ListBucket]
              Resource:
                - !Sub 'arn:aws:s3:::${S3BucketName}'
                - !Sub 'arn:aws:s3:::${S3BucketName}/*'
            - Sid: CloudFrontInvalidation
              Effect: Allow
              Action: [cloudfront:CreateInvalidation]
              Resource: !Sub 'arn:aws:cloudfront::${AWS::AccountId}:distribution/${DistributionId}'
```

Principle of least privilege — CodeBuild can only write to the specific S3 bucket and invalidate the specific CloudFront distribution.

---

## buildspec.yml

The build specification lives in the repo root and tells CodeBuild exactly what to do:

```yaml
version: 0.2

env:
  variables:
    VITE_CONTACT_API_URL: ""  # overridden by CodeBuild project env var

phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - npm ci

  build:
    commands:
      - npm run build

  post_build:
    commands:
      - aws s3 sync dist/ s3://$S3_BUCKET --delete
      - aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
```

### Key points

**`npm ci` not `npm install`**  
`npm ci` installs exactly what's in `package-lock.json` and fails if there are any discrepancies. This ensures deterministic builds — the same packages every time, in every environment.

**`--delete` flag on s3 sync**  
Removes files from S3 that no longer exist in the build output. Without this, deleted pages or renamed assets would stay in S3 forever and get served to users.

**CloudFront invalidation**  
Vite includes content hashes in asset filenames (`index-BX7FeaXh.js`), so JS/CSS files are automatically cache-busted. However, `index.html` itself doesn't have a hash — it must be explicitly invalidated so CloudFront fetches the new version immediately.

**`VITE_CONTACT_API_URL` env var**  
Vite's `import.meta.env.VITE_*` variables are replaced at build time (not runtime). The API Gateway URL is injected by CodeBuild as an environment variable and baked into the built JS bundle. This means the frontend always has the correct endpoint URL without any runtime configuration.

---

## Troubleshooting the GitHub Connection

The CodeStar Connection requires careful setup. Common issues encountered:

**Status: PENDING after stack deploy**  
Expected. You must visit the AWS Console to authorize it. Cannot be done via CLI.

**"No Branch found" error**  
The GitHub App was authorized but the private repository wasn't explicitly granted access. Fix: GitHub → Settings → Applications → AWS Connector for GitHub → Configure → add the repo.

**"Role does not have sufficient permissions" error**  
After replacing a broken connection with a new one, the CodePipeline IAM role policy still referenced the old connection ARN. Fix: update the `codestar-connections:UseConnection` resource ARN in the IAM policy to match the new connection ARN.

---

## Deployment Timeline

From `git push` to live site:

| Phase | Duration |
|---|---|
| CodePipeline detects change | ~10 seconds |
| Source download from GitHub | ~15 seconds |
| `npm ci` (cache warm) | ~30 seconds |
| `npm run build` (tsc + vite) | ~15 seconds |
| `aws s3 sync` | ~10 seconds |
| CloudFront invalidation | ~10 seconds |
| **Total** | **~90 seconds** |

Full deployment in under two minutes on every push to main.
