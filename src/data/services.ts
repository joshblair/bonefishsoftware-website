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
      'We build custom business software that simplifies operations, improves workflow, and creates a better experience for your team and customers.',
    icon: '⚙️',
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture & Migration',
    description:
      'Modern cloud solutions that help businesses stay organized, secure, scalable, and cost-conscious.',
    icon: '☁️',
  },
  {
    id: 'solution-architecture',
    title: 'Solution Architecture',
    description:
      'We document how your systems work, what needs to be built, and why — so everyone stays on the same page.',
    icon: '🏗️',
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning Integration',
    description:
      'Use AI to simplify workflows, improve accessibility, and unlock more value from your business data and content.',
    icon: '🤖',
  },
  {
    id: 'eda-serverless',
    title: 'Event-Driven Architecture & Serverless',
    description:
      'We create reliable, scalable systems that automate key processes and reduce manual work.',
    icon: '⚡',
  },
  {
    id: 'devops-cicd',
    title: 'DevOps & CI/CD Pipelines',
    description:
      'We build reliable software delivery processes that reduce errors, improve speed, and keep projects moving efficiently.',
    icon: '🔄',
  },
];
