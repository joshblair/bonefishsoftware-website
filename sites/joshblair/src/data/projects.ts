export interface Project {
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  articleSeriesUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: 'Sift',
    description: 'Multi-tenant AI document platform on AWS — upload documents, ask questions, get answers grounded in your content.',
    longDescription: 'Full-stack multi-tenant SaaS application for AI-powered document search and chat. Users upload documents that are chunked, embedded, and stored in PostgreSQL with pgvector. Queries are answered via RAG using Amazon Bedrock (Claude). Tenant isolation is enforced at the database level with PostgreSQL Row-Level Security and Cognito-issued JWTs. Document processing is orchestrated with AWS Step Functions, and the React frontend provides a document library and streaming chat UI. Zero-secret CI/CD via GitHub Actions and AWS OIDC.',
    tags: ['AWS', 'AI', 'RAG', 'Multi-Tenant', 'PostgreSQL', 'React', 'TypeScript', 'Step Functions', 'Bedrock'],
    githubUrl: 'https://github.com/joshblair/sift',
    articleSeriesUrl: 'https://dev.to/josh_blair/series/39909',
    featured: true,
  },
  {
    name: 'Bonefish Software Company Website',
    description: 'Production company website built on AWS primitives — S3, CloudFront, CodePipeline, Lambda, and Route 53.',
    longDescription: 'Full-stack serverless company website built on raw AWS primitives to demonstrate production-grade cloud architecture. React + Vite + TypeScript + Tailwind CSS v4 frontend, automated CI/CD via CodePipeline and CodeBuild, and a serverless contact form backed by API Gateway, Lambda, DynamoDB, and SES. All infrastructure defined in CloudFormation and SAM.',
    tags: ['React', 'TypeScript', 'AWS', 'CloudFront', 'Lambda', 'CloudFormation', 'SAM'],
    githubUrl: 'https://github.com/joshblair/bonefishsoftware-website',
    liveUrl: 'https://bonefishsoftware.com',
    featured: true,
  },
]
