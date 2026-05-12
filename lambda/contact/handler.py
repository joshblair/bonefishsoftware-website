import json
import os
import uuid
from datetime import datetime, timezone

import boto3
from botocore.exceptions import ClientError

ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://bonefishsoftware.com")
TABLE_NAME = os.environ["TABLE_NAME"]
FROM_ADDRESS = os.environ["FROM_ADDRESS"]
TO_ADDRESS = os.environ["TO_ADDRESS"]
AWS_REGION = os.environ.get("AWS_REGION", "us-west-2")

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
ses = boto3.client("ses", region_name=AWS_REGION)


def handler(event, context):
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return _response(200, {})

    try:
        body = json.loads(event.get("body") or "{}")
    except (json.JSONDecodeError, TypeError):
        return _response(400, {"error": "Invalid request body."})

    name = (body.get("name") or "").strip()
    email = (body.get("email") or "").strip()
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


def _save_to_dynamo(submission_id, timestamp, name, email, company, message):
    table = dynamodb.Table(TABLE_NAME)
    item = {
        "submissionId": submission_id,
        "timestamp": timestamp,
        "name": name,
        "email": email,
        "message": message,
    }
    if company:
        item["company"] = company
    table.put_item(Item=item)


def _send_email(submission_id, timestamp, name, email, company, message):
    subject = f"New contact from {name} — Bonefish Software"
    body = f"""New contact form submission from bonefishsoftware.com

Name:    {name}
Email:   {email}
Company: {company or "—"}

Message:
{message}

---
Submission ID: {submission_id}
Received:      {timestamp}
"""
    ses.send_email(
        Source=FROM_ADDRESS,
        Destination={"ToAddresses": [TO_ADDRESS]},
        Message={
            "Subject": {"Data": subject},
            "Body": {"Text": {"Data": body}},
        },
        ReplyToAddresses=[email],
    )


def _response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        "body": json.dumps(body),
    }
