export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  certifications: string[];
  linkedin?: string;
  github?: string;
}

export const team: TeamMember[] = [
  {
    name: '[YOUR NAME]',
    title: '[YOUR TITLE]',
    bio: '[YOUR BIO — A few sentences about your background, what you love building, and what makes you a great partner for clients.]',
    certifications: [
      'AWS Certified Solutions Architect – Associate',
      'AWS Certified Cloud Practitioner',
      'AWS Partner Accreditation – Technical',
      'Certified ScrumMaster',
      'Microsoft Certified Application Developer .NET',
    ],
    linkedin: 'https://linkedin.com/in/[YOUR-HANDLE]',
    github: 'https://github.com/[YOUR-HANDLE]',
  },
];
