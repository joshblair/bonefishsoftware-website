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
]
