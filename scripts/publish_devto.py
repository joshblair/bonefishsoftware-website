#!/usr/bin/env python3
"""
Publish all 5 Dev.to draft articles and update cross-links in the index article.

Usage:
    DEVTO_API_KEY=<your-key> python3 scripts/publish_devto.py
"""
import json, os, subprocess, sys, tempfile, time

API_KEY = os.environ.get("DEVTO_API_KEY")
if not API_KEY:
    sys.exit("Error: set the DEVTO_API_KEY environment variable before running.")

# Article 1 (index) — published last after cross-links are updated
INDEX_ID = 3711378

# Articles 2-5 — published first so their final URLs can be collected
NON_INDEX = [
    {
        "id": 3711379,
        "label": "02 - React + Vite + Tailwind",
        "temp_url": "https://dev.to/josh_blair/react-vite-typescript-tailwind-css-v4-project-setup-46nn-temp-slug-3249131",
    },
    {
        "id": 3711381,
        "label": "03 - Static Hosting",
        "temp_url": "https://dev.to/josh_blair/static-site-hosting-on-aws-s3-cloudfront-acm-and-route-53-42fe-temp-slug-5079945",
    },
    {
        "id": 3711380,
        "label": "04 - CI/CD",
        "temp_url": "https://dev.to/josh_blair/cicd-with-aws-codepipeline-and-codebuild-1nm-temp-slug-1886578",
    },
    {
        "id": 3711383,
        "label": "05 - Serverless Contact Form",
        "temp_url": "https://dev.to/josh_blair/serverless-contact-form-lambda-api-gateway-dynamodb-and-ses-4k8m-temp-slug-951393",
    },
]


def put_article(article_id, payload):
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as tmp:
        json.dump(payload, tmp, ensure_ascii=False)
        tmp_path = tmp.name
    result = subprocess.run(
        ["curl", "-s", "-X", "PUT", f"https://dev.to/api/articles/{article_id}",
         "-H", f"api-key: {API_KEY}",
         "-H", "Content-Type: application/json",
         "--data-binary", f"@{tmp_path}"],
        capture_output=True, text=True,
    )
    os.unlink(tmp_path)
    return json.loads(result.stdout)


# Step 1: Publish articles 2-5 and collect final URLs
url_replacements = {}
for a in NON_INDEX:
    r = put_article(a["id"], {"article": {"published": True}})
    if "id" not in r:
        sys.exit(f"Failed to publish {a['label']}: {str(r)[:300]}")
    url_replacements[a["temp_url"]] = r["url"]
    print(f"Published  {a['label']}\n  {r['url']}")
    time.sleep(3)

# Step 2: Fetch article 1's current body
result = subprocess.run(
    ["curl", "-s", "https://dev.to/api/articles/me/unpublished",
     "-H", f"api-key: {API_KEY}"],
    capture_output=True, text=True,
)
drafts = json.loads(result.stdout)
index_draft = next((a for a in drafts if a["id"] == INDEX_ID), None)
if not index_draft:
    sys.exit(f"Article 1 (id {INDEX_ID}) not found in drafts — already published?")
body = index_draft["body_markdown"]

# Step 3: Swap temp-slug URLs for final URLs
for temp_url, final_url in url_replacements.items():
    body = body.replace(temp_url, final_url)

# Step 4: Update cross-links and publish article 1
r = put_article(INDEX_ID, {"article": {"body_markdown": body, "published": True}})
if "id" not in r:
    sys.exit(f"Failed to publish article 1: {str(r)[:300]}")
print(f"Published  01 - Project Overview\n  {r['url']}")

print("\nAll 5 articles published.")
