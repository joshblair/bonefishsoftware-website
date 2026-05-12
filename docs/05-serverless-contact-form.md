# Serverless Contact Form — Lambda, API Gateway, DynamoDB, and SES

**Series:** Building bonefishsoftware.com from scratch  
**Author:** Josh Blair

---

## Overview

The contact form on bonefishsoftware.com is fully serverless — no EC2, no always-on server. A visitor submits the form, the request hits an API Gateway HTTP API, a Python Lambda function validates and stores the submission in DynamoDB, then sends an email notification via SES. Cost at low volume: effectively zero.

See [`docs/diagrams/contact-form-flow.excalidraw`](diagrams/contact-form-flow.excalidraw) for the visual diagram.

---

## Flow

```
Browser (Contact Form)
        │
        │  POST /contact
        │  { name, email, company, message }
        ▼
API Gateway HTTP API
(CORS: bonefishsoftware.com + localhost:5173)
        │
        ▼
Lambda Function (Python 3.12)
├── Validate input
├── Generate submission ID (UUID)
│
├── DynamoDB PutItem
│   Table: bonefish-contact-submissions
│   Key: submissionId (UUID) + timestamp (ISO 8601)
│
└── SES SendEmail
    FROM: noreply@bonefishsoftware.com
    TO:   josh.blair@gmail.com
    Reply-To: <submitter's email>
    Body: name, email, company, message, submission ID
        │
        ▼
    { "message": "Message received! We'll be in touch soon." }
```

---

## Infrastructure — AWS SAM

The contact API is deployed using **AWS SAM** (Serverless Application Model), a CloudFormation extension that simplifies Lambda + API Gateway resource definitions.

> **Why SAM over plain CloudFormation?**  
> SAM's `AWS::Serverless::Function` with `Events` automatically creates the API Gateway routes, integrations, Lambda permissions, and stage. Doing this in plain CloudFormation requires 6–8 separate resource definitions. SAM condenses it to one function resource with an `Events` section.

### Key lesson: `AWS::Serverless::HttpApi` vs `AWS::ApiGatewayV2::Api`

The most important thing to get right: when using SAM's `HttpApi` event type, the `ApiId` **must reference an `AWS::Serverless::HttpApi` resource** — not a native `AWS::ApiGatewayV2::Api`.

Using the wrong resource type results in the SAM transform silently skipping route and integration creation, leaving you with a deployed API that returns 404 on every request.

```yaml
# ✅ Correct — SAM manages routes/integrations automatically
ContactApi:
  Type: AWS::Serverless::HttpApi
  Properties:
    CorsConfiguration:
      AllowOrigins: [https://bonefishsoftware.com]
      AllowMethods: [POST, OPTIONS]
      AllowHeaders: [Content-Type]

ContactFunction:
  Type: AWS::Serverless::Function
  Events:
    PostContact:
      Type: HttpApi
      Properties:
        ApiId: !Ref ContactApi   # ← references Serverless::HttpApi
        Path: /contact
        Method: POST
```

```yaml
# ❌ Wrong — routes NOT created by SAM
ContactApi:
  Type: AWS::ApiGatewayV2::Api  # ← native resource, SAM ignores events
```

---

## Lambda Function (Python)

```python
# lambda/contact/handler.py

import json, os, uuid
from datetime import datetime, timezone
import boto3
from botocore.exceptions import ClientError

ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://bonefishsoftware.com")
TABLE_NAME = os.environ["TABLE_NAME"]
FROM_ADDRESS = os.environ["FROM_ADDRESS"]
TO_ADDRESS = os.environ["TO_ADDRESS"]

dynamodb = boto3.resource("dynamodb")
ses = boto3.client("ses")

def handler(event, context):
    # Handle CORS preflight
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return _response(200, {})

    # Parse and validate
    try:
        body = json.loads(event.get("body") or "{}")
    except (json.JSONDecodeError, TypeError):
        return _response(400, {"error": "Invalid request body."})

    name    = (body.get("name") or "").strip()
    email   = (body.get("email") or "").strip()
    message = (body.get("message") or "").strip()
    company = (body.get("company") or "").strip()

    if not name or not email or not message:
        return _response(400, {"error": "Name, email, and message are required."})

    if "@" not in email or "." not in email.split("@")[-1]:
        return _response(400, {"error": "Please provide a valid email address."})

    submission_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc).isoformat()

    try:
        _save_to_dynamo(submission_id, timestamp, name, email, company, message)
        _send_email(submission_id, timestamp, name, email, company, message)
    except ClientError as e:
        print(f"AWS error: {e}")
        return _response(500, {"error": "Failed to process your message. Please try again."})

    return _response(200, {"message": "Message received! We'll be in touch soon."})
```

### Why no external dependencies?

Python's `boto3` SDK is built into the Lambda runtime — no requirements.txt needed. The deployment package is just a single `handler.py` file, keeping Lambda cold-start time minimal.

### Validation approach

Validation is intentionally lightweight:
- Required field presence check
- Naive email format check (contains `@` and a `.` after it)

We're not the primary spam defense here — the contact form has no public financial incentive to spam, and rate limiting can be added at the API Gateway level later if needed.

---

## DynamoDB Table

```yaml
SubmissionsTable:
  Type: AWS::DynamoDB::Table
  Properties:
    TableName: bonefish-contact-submissions
    BillingMode: PAY_PER_REQUEST
    AttributeDefinitions:
      - AttributeName: submissionId
        AttributeType: S
      - AttributeName: timestamp
        AttributeType: S
    KeySchema:
      - AttributeName: submissionId
        KeyType: HASH
      - AttributeName: timestamp
        KeyType: RANGE
```

**PAY_PER_REQUEST billing** — no provisioned capacity to manage. At the volume of a contact form (single-digit submissions per day at most), this costs essentially nothing.

**Composite key** (submissionId + timestamp) — the UUID ensures uniqueness; the timestamp makes it easy to sort and query submissions chronologically in future tooling.

---

## SES Email Delivery

### Domain verification (DKIM)

Emails sent from `noreply@bonefishsoftware.com` require the domain to be verified in SES. This involves adding three DKIM CNAME records to Route 53:

```bash
aws sesv2 create-email-identity \
  --email-identity bonefishsoftware.com \
  --region us-west-2
# → returns 3 DKIM tokens

# Add CNAME records: <token>._domainkey.bonefishsoftware.com → <token>.dkim.amazonses.com
```

DKIM signing tells receiving mail servers that the email genuinely came from our domain, improving deliverability and preventing spoofing.

### Sandbox mode

By default, SES operates in **sandbox mode** — you can only send to verified email addresses. This is sufficient for the contact form (we only send TO `josh.blair@gmail.com`, which is verified). The submitter's email address appears only in the `Reply-To` header and the email body — never as a direct recipient.

SES production access (removing sandbox restrictions) was requested via:

```bash
aws sesv2 put-account-details \
  --mail-type TRANSACTIONAL \
  --website-url https://bonefishsoftware.com \
  --use-case-description "..." \
  --production-access-enabled
```

### Reply-To header

```python
ses.send_email(
    Source=FROM_ADDRESS,                  # noreply@bonefishsoftware.com
    Destination={"ToAddresses": [TO_ADDRESS]},  # josh.blair@gmail.com
    Message={...},
    ReplyToAddresses=[email],             # submitter's email
)
```

Setting `ReplyToAddresses` to the submitter's email means hitting "Reply" in gmail automatically addresses the response to the client — no copy-pasting required.

---

## CORS Configuration

CORS is configured at the API Gateway level (not in the Lambda response), via the `AWS::Serverless::HttpApi` resource:

```yaml
ContactApi:
  Type: AWS::Serverless::HttpApi
  Properties:
    CorsConfiguration:
      AllowOrigins:
        - https://bonefishsoftware.com
        - http://localhost:5173    # local dev
      AllowHeaders:
        - Content-Type
      AllowMethods:
        - POST
        - OPTIONS
      MaxAge: 300
```

The Lambda still returns `Access-Control-Allow-Origin` headers in its response (for safety), but API Gateway handles the OPTIONS preflight response automatically.

**Lesson learned:** An early version used `AWS::ApiGatewayV2::Api` instead of `AWS::Serverless::HttpApi`. The CORS configuration was present but the routes were never created — resulting in 404 responses and CORS errors in the browser. Switching to `AWS::Serverless::HttpApi` resolved both issues simultaneously.

---

## Frontend Integration

The contact form in React fetches the API URL from a Vite environment variable:

```tsx
// src/pages/Contact.tsx
const apiUrl = import.meta.env.VITE_CONTACT_API_URL;

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setStatus('submitting');
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('Request failed');
    setStatus('success');
  } catch {
    setStatus('error');
  }
}
```

`VITE_CONTACT_API_URL` is injected at build time by CodeBuild as an environment variable. Vite replaces `import.meta.env.VITE_*` references with literal string values during the build — there's no runtime environment lookup.

---

## SAM Deployment

```bash
sam deploy \
  --template-file infra/stacks/contact-api.yml \
  --stack-name bonefish-contact-api \
  --region us-west-2 \
  --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
  --s3-bucket bonefish-pipeline-artifacts-709085484102 \
  --s3-prefix sam-contact \
  --no-confirm-changeset
```

`CAPABILITY_AUTO_EXPAND` is required when the template uses `Transform: AWS::Serverless-2016-10-31`. This tells CloudFormation to expand SAM macros before processing the template.

SAM packages the Lambda code (zips `lambda/contact/`), uploads to the artifacts S3 bucket, and replaces the local `CodeUri` path with the S3 URL in the transformed template — all automatically.

---

## Cost Analysis

At typical consulting site traffic:

| Resource | Usage | Estimated cost |
|---|---|---|
| API Gateway HTTP API | 100 requests/month | $0.001 |
| Lambda | 100 invocations × 128MB × 500ms | < $0.01 |
| DynamoDB | 100 writes, PAY_PER_REQUEST | < $0.01 |
| SES | 100 emails | $0.01 |
| **Total** | | **< $0.05/month** |

The entire contact form backend costs pennies per month.
