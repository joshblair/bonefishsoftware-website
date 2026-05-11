export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description:
      'Full-stack application development tailored to your business needs. From API design to polished UIs, using modern frameworks and cloud-native patterns.',
    icon: '⚙️',
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture & Migration',
    description:
      'Design and implement secure, scalable AWS infrastructure. Lift-and-shift migrations, cloud-native redesigns, and cost optimization across EC2, RDS, S3, and more.',
    icon: '☁️',
  },
  {
    id: 'solution-architecture',
    title: 'Solution Architecture',
    description:
      'Translate complex business requirements into clear, maintainable technical designs. System diagrams, architecture decision records, and stakeholder-ready documentation.',
    icon: '🏗️',
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning Integration',
    description:
      'Integrate AWS AI services into your applications — Bedrock knowledge bases, Rekognition, Comprehend, Polly, Transcribe, and Translate — to unlock intelligent capabilities fast.',
    icon: '🤖',
  },
  {
    id: 'eda-serverless',
    title: 'Event-Driven Architecture & Serverless',
    description:
      'Architect decoupled, resilient systems using SQS, SNS, EventBridge, and Lambda. Serverless-first designs that scale automatically and minimize operational overhead.',
    icon: '⚡',
  },
  {
    id: 'devops-cicd',
    title: 'DevOps & CI/CD Pipelines',
    description:
      'Automate your software delivery with AWS CodePipeline, CodeBuild, CodeDeploy, and GitHub Actions. Repeatable, fast deployments from commit to production.',
    icon: '🔄',
  },
];
