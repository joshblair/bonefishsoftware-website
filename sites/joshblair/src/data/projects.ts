export interface Project {
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: 'Bonefish Software Company Website',
    description: 'Production company website built on AWS primitives — S3, CloudFront, CodePipeline, Lambda, and Route 53.',
    longDescription: 'Full-stack serverless company website built on raw AWS primitives to demonstrate production-grade cloud architecture. React + Vite + TypeScript + Tailwind CSS v4 frontend, automated CI/CD via CodePipeline and CodeBuild, and a serverless contact form backed by API Gateway, Lambda, DynamoDB, and SES. All infrastructure defined in CloudFormation and SAM.',
    tags: ['React', 'TypeScript', 'AWS', 'CloudFront', 'Lambda', 'CloudFormation', 'SAM'],
    githubUrl: 'https://github.com/joshblair/bonefishsoftware-website',
    liveUrl: 'https://bonefishsoftware.com',
    featured: true,
  },
  {
    name: 'AWS Bedrock RAG Pipeline',
    description: 'Serverless document ingestion and retrieval pipeline using AWS Bedrock Knowledge Bases.',
    longDescription: 'A fully serverless RAG (Retrieval-Augmented Generation) pipeline built on AWS Bedrock, Lambda, S3, and OpenSearch Serverless. Ingests documents, chunks and embeds them automatically, and exposes a query API backed by Claude.',
    tags: ['AWS Bedrock', 'Lambda', 'Python', 'OpenSearch', 'CDK'],
    githubUrl: 'https://github.com/joshblair/aws-bedrock-rag-pipeline',
    featured: true,
  },
  {
    name: 'Event-Driven Notification System',
    description: 'Real-time notification platform using SNS, SQS, and Lambda fan-out pattern.',
    longDescription: 'A scalable event-driven notification system that fans out to multiple channels (email, SMS, push) using AWS SNS and SQS. Includes dead-letter queues, retry logic, and CloudWatch dashboards.',
    tags: ['AWS SNS', 'SQS', 'Lambda', 'TypeScript', 'CloudFormation'],
    githubUrl: 'https://github.com/joshblair/event-driven-notifications',
    featured: true,
  },
  {
    name: 'Serverless Contact API',
    description: 'HTTP API + Lambda + SES contact form backend with DynamoDB submission logging.',
    longDescription: 'Production-grade serverless contact form API using API Gateway HTTP API, Python Lambda, SES for email delivery, and DynamoDB for submission storage. Includes CORS, input validation, and CloudFormation/SAM deployment.',
    tags: ['Lambda', 'API Gateway', 'SES', 'DynamoDB', 'Python', 'SAM'],
    githubUrl: 'https://github.com/joshblair/serverless-contact-api',
    featured: false,
  },
  {
    name: 'AI Agent Orchestration Framework',
    description: 'Multi-agent orchestration using Claude and AWS Bedrock Agents with tool use.',
    longDescription: 'A framework for orchestrating multiple AI agents using Claude and Bedrock Agents. Demonstrates tool use, agent handoffs, and structured output parsing for complex multi-step workflows.',
    tags: ['Claude', 'AWS Bedrock', 'Python', 'Agentic AI', 'Lambda'],
    githubUrl: 'https://github.com/joshblair/ai-agent-orchestration',
    featured: true,
  },
]
