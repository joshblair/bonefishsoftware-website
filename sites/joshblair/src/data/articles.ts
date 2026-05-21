export interface Article {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  slug: string;
  devToUrl?: string;
  mediumUrl?: string;
  linkedinUrl?: string;
  isSeries?: boolean;
  articleCount?: number;
}

export const articles: Article[] = [
  {
    title: 'Building Sift: A Multi-Tenant AI Platform on AWS',
    summary: 'A 6-part series covering the full build of a multi-tenant AI document platform — architecture, Cognito + PostgreSQL RLS auth, Step Functions document pipelines, RAG with pgvector and Bedrock, a React chat UI, and zero-secret CI/CD with GitHub Actions and OIDC.',
    date: '2026-05-21',
    tags: ['AWS', 'AI', 'Multi-Tenant', 'Serverless', 'PostgreSQL', 'React'],
    slug: 'building-sift-multi-tenant-ai-platform',
    devToUrl: 'https://dev.to/josh_blair/series/39909',
    isSeries: true,
    articleCount: 6,
  },
  {
    title: 'Building bonefishsoftware.com from Scratch',
    summary: 'A 5-part series documenting the full build of a production company website on AWS — React + Vite + Tailwind setup, S3/CloudFront static hosting, CodePipeline CI/CD, and a serverless contact form with Lambda, API Gateway, DynamoDB, and SES.',
    date: '2026-05-21',
    tags: ['AWS', 'React', 'Vite', 'Tailwind CSS', 'Serverless', 'CI/CD'],
    slug: 'building-bonefishsoftware-from-scratch',
    devToUrl: 'https://dev.to/josh_blair/series/39895',
    isSeries: true,
    articleCount: 5,
  },
]
