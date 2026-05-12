export interface TeamMember {
  name: string;
  title: string;
  bio: string[];
  certifications: string[];
  linkedin?: string;
  github?: string;
  photo?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Josh Blair',
    title: 'Founder & Principal Engineer — AWS Cloud Architect | Agentic AI Specialist',
    bio: [
      'Josh is a passionate, results-driven software developer and cloud architect with a decade of experience delivering production-grade solutions for enterprise clients. Most recently, he served as Lead Software Developer at Kanso Software for over 9 years, driving innovation in cloud-based housing authority platforms serving hundreds of organizations across the United States.',
      'Today, Josh\'s primary focus is building intelligent Agentic AI systems — designing scalable architectures powered by AWS Bedrock, Knowledge Bases, Guardrails, and event-driven patterns that solve real-world problems at scale. He combines deep backend expertise in C# .NET, Node.js, and SQL with modern serverless and AI-native design, and is actively building proficiency in Python for AI agent development.',
      'Josh brings the same energy to every engagement: ship high-quality software, communicate clearly, and leave the codebase better than he found it.',
    ],
    certifications: [
      'AWS Certified Solutions Architect – Associate',
      'AWS Certified Cloud Practitioner',
      'AWS Partner Accreditation – Technical',
      'Certified ScrumMaster',
      'Microsoft Certified Application Developer .NET',
      'Microsoft Certified Professional',
    ],
    linkedin: 'https://linkedin.com/in/joshblair/',
    github: 'https://github.com/joshblair',
    photo: '/josh-blair.jpg',
  },
];
