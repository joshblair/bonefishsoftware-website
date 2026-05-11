export interface TechGroup {
  label: string;
  items: string[];
}

export interface Certification {
  name: string;
  short: string;
}

export const techGroups: TechGroup[] = [
  {
    label: 'AWS Services',
    items: [
      'EC2', 'RDS', 'DynamoDB', 'S3', 'IAM', 'SQS', 'SNS', 'CloudFront',
      'VPC', 'API Gateway', 'Lambda', 'ECS', 'ECR', 'Fargate', 'EKS',
      'Bedrock', 'Bedrock Knowledge Bases', 'Rekognition', 'Comprehend',
      'Translate', 'Transcribe', 'Polly',
      'CodePipeline', 'CodeBuild', 'CodeDeploy',
    ],
  },
  {
    label: 'Languages',
    items: ['Python', 'Boto3 / AWS SDK', 'C# / .NET', 'JavaScript', 'TypeScript', 'Django'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Angular', 'Express.js', 'Node.js'],
  },
  {
    label: 'Databases',
    items: ['DynamoDB', 'SQL Server', 'MongoDB', 'PostgreSQL', 'Entity Framework Core'],
  },
  {
    label: 'DevOps & Containers',
    items: ['Docker', 'ECR', 'ECS / Fargate', 'GitHub Actions', 'AWS CodePipeline', 'AWS CodeBuild', 'AWS CodeDeploy'],
  },
];

export const certifications: Certification[] = [
  { name: 'AWS Certified Solutions Architect – Associate', short: 'AWS SAA' },
  { name: 'AWS Certified Cloud Practitioner', short: 'AWS CCP' },
  { name: 'AWS Partner Accreditation – Technical', short: 'AWS Partner Technical' },
  { name: 'LFEL1000 Introduction to FDC3', short: 'FDC3' },
  { name: 'Certified ScrumMaster', short: 'CSM' },
  { name: 'Microsoft Certified Application Developer .NET', short: 'MCAD .NET' },
  { name: 'Microsoft Certified Professional', short: 'MCP' },
];
