"""Forward mail received by SES for *@bonefishsoftware.com to a personal inbox.

SES stores the raw message in S3, then invokes this function. The message is
re-sent from a verified address on our domain, because SES can't send as the
original sender and the receiving server would fail it on DMARC anyway. The
original sender moves to Reply-To so replies still go to the right person.
"""

import os
from email import message_from_bytes
from email.utils import formataddr, parseaddr

import boto3

BUCKET = os.environ["MAIL_BUCKET"]
PREFIX = os.environ.get("MAIL_PREFIX", "inbound/")
FORWARD_FROM = os.environ["FORWARD_FROM"]
FORWARD_TO = os.environ["FORWARD_TO"]
DOMAIN_LABEL = os.environ.get("DOMAIN_LABEL", "bonefishsoftware.com")
AWS_REGION = os.environ.get("AWS_REGION", "us-west-2")

# SESv2 accepts raw messages up to 40 MB.
MAX_RAW_BYTES = 40 * 1024 * 1024

# Headers that would break or misattribute the re-sent message. SES adds its
# own DKIM signature and Return-Path for our domain.
STRIP_HEADERS = ("DKIM-Signature", "DomainKey-Signature", "Return-Path", "Sender", "Reply-To")

s3 = boto3.client("s3", region_name=AWS_REGION)
ses = boto3.client("sesv2", region_name=AWS_REGION)


def handler(event, context):
    record = event["Records"][0]["ses"]
    mail = record["mail"]
    receipt = record["receipt"]
    message_id = mail["messageId"]
    key = f"{PREFIX}{message_id}"

    reason = _drop_reason(receipt)
    if reason:
        print(f"Dropped {message_id}: {reason}")
        return {"status": "dropped", "reason": reason}

    raw = s3.get_object(Bucket=BUCKET, Key=key)["Body"].read()
    msg = message_from_bytes(raw)

    sender_name, sender_addr = parseaddr(msg.get("From", ""))
    if sender_addr.lower() == FORWARD_FROM.lower():
        print(f"Dropped {message_id}: sent by the forwarder itself (loop guard)")
        return {"status": "dropped", "reason": "loop"}

    reply_to = msg.get("Reply-To") or msg.get("From", "")
    for header in STRIP_HEADERS + ("From",):
        del msg[header]

    display = sender_name or sender_addr or "Unknown sender"
    msg["From"] = formataddr((f"{display} via {DOMAIN_LABEL}", FORWARD_FROM))
    if reply_to:
        msg["Reply-To"] = reply_to
    msg["X-Original-To"] = ", ".join(receipt.get("recipients", []))
    msg["X-Original-From"] = sender_addr

    data = msg.as_bytes()
    if len(data) > MAX_RAW_BYTES:
        _send_notice(message_id, sender_addr, msg.get("Subject", ""), key, len(data))
        return {"status": "too_large", "bytes": len(data)}

    ses.send_email(
        FromEmailAddress=FORWARD_FROM,
        Destination={"ToAddresses": [FORWARD_TO]},
        Content={"Raw": {"Data": data}},
    )
    print(f"Forwarded {message_id} from {sender_addr} to {FORWARD_TO}")
    return {"status": "forwarded"}


def _drop_reason(receipt):
    """Return why a message shouldn't be forwarded, or None to forward it."""
    if receipt.get("virusVerdict", {}).get("status") == "FAIL":
        return "virus"
    if receipt.get("spamVerdict", {}).get("status") == "FAIL":
        return "spam"
    # Honor the sending domain's own policy: it asked receivers to reject this.
    if receipt.get("dmarcVerdict", {}).get("status") == "FAIL" and receipt.get("dmarcPolicy") == "REJECT":
        return "dmarc reject"
    return None


def _send_notice(message_id, sender, subject, key, size):
    """Tell the owner about a message too large to forward. The original stays in S3."""
    body = (
        f"A message was too large to forward ({size / 1024 / 1024:.1f} MB).\n\n"
        f"From: {sender}\nSubject: {subject}\n\n"
        f"The original is saved at s3://{BUCKET}/{key} until the bucket's lifecycle rule removes it.\n"
    )
    ses.send_email(
        FromEmailAddress=FORWARD_FROM,
        Destination={"ToAddresses": [FORWARD_TO]},
        Content={"Simple": {
            "Subject": {"Data": f"[Too large to forward] {subject}"[:200]},
            "Body": {"Text": {"Data": body}},
        }},
    )
    print(f"Too large to forward {message_id} ({size} bytes); sent notice")
