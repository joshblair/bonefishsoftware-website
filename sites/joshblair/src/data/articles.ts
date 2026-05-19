export interface Article {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  slug: string;
  devToUrl?: string;
  mediumUrl?: string;
  linkedinUrl?: string;
}

export const articles: Article[] = [
  {
    title: 'Building a Production RAG Pipeline on AWS Bedrock',
    summary: 'A step-by-step walkthrough of building a serverless RAG pipeline using AWS Bedrock Knowledge Bases, Lambda, and S3 — including lessons learned from production.',
    date: '2025-06-01',
    tags: ['AWS Bedrock', 'RAG', 'Serverless', 'AI'],
    slug: 'building-rag-pipeline-aws-bedrock',
  },
  {
    title: 'Event-Driven Architecture Patterns on AWS',
    summary: 'Practical patterns for building resilient, decoupled systems using SNS, SQS, EventBridge, and Lambda — with real-world examples.',
    date: '2025-05-01',
    tags: ['AWS', 'Event-Driven', 'Architecture', 'Lambda'],
    slug: 'event-driven-architecture-aws',
  },
]
