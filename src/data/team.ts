export interface TeamMember {
  name: string;
  title: string;
  bio: string[];
  certifications: string[];
  website?: string;
  linkedin?: string;
  github?: string;
  photo?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Josh Blair',
    title: 'Founder & Principal Engineer — AWS Cloud Architect | Agentic AI Specialist',
    bio: [
      'Josh is a software developer and cloud architect with more than 30 years of experience building dependable technology solutions and helping teams solve complex problems. Over the last decade, his work has focused heavily on cloud-based software platforms, including more than 9 years at Kanso Software as a Senior and Lead Software Developer supporting housing authority systems used by hundreds of organizations across the United States.',
      'Today, Josh focuses on modern cloud architecture and intelligent AI-powered systems using AWS technologies like Bedrock, Knowledge Bases, Guardrails, Lambda, and event-driven infrastructure. His background includes deep experience in C# .NET, Node.js, SQL, serverless systems, and cloud-native application design, along with continued growth in Python and AI agent development.',
      'What people tend to appreciate most about Josh is not just his technical knowledge, but the way he works with others. He\'s known for being approachable, thoughtful, collaborative, and easy to talk to. He enjoys mentoring, helping teams work through difficult challenges, and explaining technical concepts in a way that makes sense to both technical and non-technical people.',
      'Josh brings a steady, team-oriented approach to every project. He cares about building reliable systems, communicating clearly, supporting the people around him, and creating solutions that genuinely help clients and organizations operate more effectively.',
    ],
    certifications: [
      'AWS Certified Solutions Architect – Associate',
      'AWS Certified Cloud Practitioner',
      'AWS Partner Accreditation – Technical',
      'Certified ScrumMaster',
      'Microsoft Certified Application Developer .NET',
      'Microsoft Certified Professional',
    ],
    website: 'https://joshblair.bonefishsoftware.com',
    linkedin: 'https://linkedin.com/in/joshblair/',
    github: 'https://github.com/joshblair',
    photo: '/josh-blair.jpg',
  },
];
