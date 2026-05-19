#!/usr/bin/env python3
"""Local mock server for testing the joshblair contact form.
Usage: python local_server.py [--fail]
  --fail  Simulate a 500 error so you can test the error state in the UI.
"""
import json
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

SIMULATE_FAILURE = "--fail" in sys.argv
PORT = 3001


class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"  {self.address_string()} {format % args}")

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST,OPTIONS")

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path != "/contact":
            self.send_response(404)
            self.end_headers()
            return

        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length) or b"{}")

        name = (body.get("name") or "").strip()
        email = (body.get("email") or "").strip()
        subject = (body.get("subject") or "").strip()
        message = (body.get("message") or "").strip()

        if SIMULATE_FAILURE:
            status, payload = 500, {"error": "Simulated failure (--fail mode)"}
        elif not name or not email or not subject or not message:
            status, payload = 400, {"error": "Name, email, subject, and message are required."}
        elif "@" not in email:
            status, payload = 400, {"error": "Please provide a valid email address."}
        else:
            print(f"\n  ✉  New submission")
            print(f"     Name:    {name}")
            print(f"     Email:   {email}")
            print(f"     Subject: {subject}")
            print(f"     Message: {message[:80]}{'…' if len(message) > 80 else ''}\n")
            status, payload = 200, {"message": "Message sent!"}

        response = json.dumps(payload).encode()
        self.send_response(status)
        self._cors_headers()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(response)


print(f"Mock contact API running on http://localhost:{PORT}/contact")
print(f"Failure mode: {'ON (--fail)' if SIMULATE_FAILURE else 'off'}")
print("Press Ctrl+C to stop.\n")
HTTPServer(("", PORT), Handler).serve_forever()
