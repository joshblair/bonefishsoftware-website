# LinkedIn Posts — Building bonefishsoftware.com Series

Post 1 (Project Overview) was published May 20, 2026.
Remaining posts on a weekly cadence — one per week.

---

## Post 2 — React + Vite + Tailwind (May 27)

Tailwind CSS v4 is a ground-up rewrite — and it broke most of the setup guides out there.

No `tailwind.config.js`. No PostCSS config. Theme customization moves into CSS via `@theme`. If you're starting a new project with v4, here's what the setup actually looks like in 2026:
👉 https://dev.to/josh_blair/react-vite-typescript-tailwind-css-v4-project-setup-4c34

Also covers the one gotcha that caused a build warning: Google Fonts `@import` must come *before* `@import "tailwindcss"` or the browser silently ignores it.

#React #Vite #TailwindCSS #TypeScript

---

## Post 3 — Static Site Hosting on AWS (Jun 3)

The right way to host a static site on AWS in 2026:
- S3 (private bucket, no static website hosting enabled)
- CloudFront with OAC — not OAI, which is deprecated
- ACM certificate in us-east-1 (CloudFront's requirement, not mine)
- Route 53 alias records to CloudFront

Everything defined in CloudFormation. Full walkthrough here:
👉 https://dev.to/josh_blair/static-site-hosting-on-aws-s3-cloudfront-acm-and-route-53-20b2

The one thing I'd flag: always use `RegionalDomainName` for your S3 origin, not `DomainName`. The global endpoint causes redirect loops with OAC.

#AWS #CloudFront #S3 #InfrastructureAsCode

---

## Post 4 — CI/CD with CodePipeline and CodeBuild (Jun 10)

`git push` → live site in under 90 seconds.

That's the entire deploy pipeline for bonefishsoftware.com: GitHub → CodePipeline → CodeBuild → S3 sync → CloudFront invalidation. No manual steps, no external CI services.

The one setup step you can't automate: authorizing the CodeStar Connection to GitHub requires a human to click approve in the AWS console. Everything else is CloudFormation.

Full walkthrough:
👉 https://dev.to/josh_blair/cicd-with-aws-codepipeline-and-codebuild-1h40

#AWS #DevOps #CICD #CodePipeline

---

## Post 5 — Serverless Contact Form (Jun 17)

The contact form on bonefishsoftware.com costs less than $0.05/month to run.

API Gateway HTTP API → Lambda (Python) → DynamoDB → SES. Deployed with SAM.

The gotcha that cost me an hour: when using SAM's `HttpApi` event type, the `ApiId` must reference an `AWS::Serverless::HttpApi` resource — not `AWS::ApiGatewayV2::Api`. Using the native resource type causes SAM to silently skip route creation, leaving you with a deployed API that returns 404 on every request.

Full breakdown of the architecture, Lambda code, SAM template, and CORS config:
👉 https://dev.to/josh_blair/serverless-contact-form-lambda-api-gateway-dynamodb-and-ses-21ap

#AWS #Serverless #Lambda #APIGateway
