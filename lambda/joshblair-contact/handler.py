import json
import os
import uuid
from datetime import datetime, timezone

import boto3
from botocore.exceptions import ClientError

ALLOWED_ORIGINS = {
    "https://joshblair.bonefishsoftware.com",
    "http://localhost:5174",
    "http://localhost:5175",
}
TABLE_NAME = os.environ["TABLE_NAME"]
FROM_ADDRESS = os.environ["FROM_ADDRESS"]
TO_ADDRESS = os.environ["TO_ADDRESS"]
AWS_REGION = os.environ.get("AWS_REGION", "us-west-2")

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
ses = boto3.client("ses", region_name=AWS_REGION)


def handler(event, context):
    origin = event.get("headers", {}).get("origin", "")
    allowed_origin = origin if origin in ALLOWED_ORIGINS else "https://joshblair.bonefishsoftware.com"

    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return _response(200, {}, allowed_origin)

    try:
        body = json.loads(event.get("body") or "{}")
    except (json.JSONDecodeError, TypeError):
        return _response(400, {"error": "Invalid request body."}, allowed_origin)

    name = (body.get("name") or "").strip()
    email = (body.get("email") or "").strip()
    subject = (body.get("subject") or "").strip()
    message = (body.get("message") or "").strip()

    if not name or not email or not subject or not message:
        return _response(400, {"error": "Name, email, subject, and message are required."}, allowed_origin)

    if "@" not in email or "." not in email.split("@")[-1]:
        return _response(400, {"error": "Please provide a valid email address."}, allowed_origin)

    submission_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc).isoformat()

    try:
        _save_to_dynamo(submission_id, timestamp, name, email, subject, message)
        _send_email(submission_id, timestamp, name, email, subject, message, allowed_origin)
    except ClientError as e:
        print(f"AWS error: {e}")
        return _response(500, {"error": "Failed to send your message. Please try again."}, allowed_origin)

    return _response(200, {"message": "Message sent!"}, allowed_origin)


def _save_to_dynamo(submission_id, timestamp, name, email, subject, message):
    table = dynamodb.Table(TABLE_NAME)
    table.put_item(Item={
        "submissionId": submission_id,
        "timestamp": timestamp,
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
    })


def _send_email(submission_id, timestamp, name, email, subject, message, allowed_origin):
    email_subject = f"[joshblair.bonefishsoftware.com] {subject}"

    text_body = f"""New contact form submission from joshblair.bonefishsoftware.com

Name:    {name}
Email:   {email}
Subject: {subject}

Message:
{message}

---
Submission ID: {submission_id}
Received:      {timestamp}
"""

    html_body = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  body {{ font-family: 'Segoe UI', system-ui, sans-serif; background: #111318; color: #F0F4F8; margin: 0; padding: 0; }}
  .wrapper {{ max-width: 560px; margin: 32px auto; background: #1C2028; border: 1px solid #2A3040; border-radius: 12px; overflow: hidden; }}
  .header {{ background: #232936; padding: 24px 32px; border-bottom: 1px solid #2A3040; }}
  .header h1 {{ margin: 0; font-size: 18px; font-weight: 600; color: #F0F4F8; }}
  .header p {{ margin: 4px 0 0; font-size: 13px; color: #00D4FF; }}
  .body {{ padding: 28px 32px; }}
  .field {{ margin-bottom: 20px; }}
  .label {{ font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #CBD5E1; margin-bottom: 4px; }}
  .value {{ font-size: 15px; color: #F0F4F8; }}
  .message-box {{ background: #232936; border: 1px solid #2A3040; border-radius: 8px; padding: 16px; font-size: 14px; color: #CBD5E1; line-height: 1.6; white-space: pre-wrap; }}
  .footer {{ padding: 16px 32px; border-top: 1px solid #2A3040; font-size: 11px; color: #B8C5D0; }}
  a {{ color: #00D4FF; text-decoration: none; }}
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <h1>New Contact Message</h1>
    <p>joshblair.bonefishsoftware.com</p>
  </div>
  <div class="body">
    <div class="field">
      <div class="label">From</div>
      <div class="value">{name} &lt;<a href="mailto:{email}">{email}</a>&gt;</div>
    </div>
    <div class="field">
      <div class="label">Subject</div>
      <div class="value">{subject}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="message-box">{message}</div>
    </div>
  </div>
  <div class="footer">
    Submission ID: {submission_id} &nbsp;·&nbsp; Received: {timestamp}
  </div>
</div>
</body>
</html>"""

    ses.send_email(
        Source=FROM_ADDRESS,
        Destination={"ToAddresses": [TO_ADDRESS]},
        Message={
            "Subject": {"Data": email_subject},
            "Body": {
                "Text": {"Data": text_body},
                "Html": {"Data": html_body},
            },
        },
        ReplyToAddresses=[email],
    )


def _response(status_code, body, allowed_origin):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowed_origin,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        "body": json.dumps(body),
    }
