export interface Testimonial {
  name: string;
  title: string;
  relationship: string;
  date: string;
  text: string;
  linkedinUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Placeholder Colleague',
    title: 'Senior Software Engineer',
    relationship: 'Worked with Josh at Kanso Software',
    date: '2023',
    text: 'Josh is one of the most dependable engineers I have worked with. His deep technical knowledge is matched only by his ability to communicate complex ideas clearly to any audience. He has a rare combination of technical excellence and genuine collaborative spirit.',
  },
  {
    name: 'Placeholder Manager',
    title: 'Engineering Manager',
    relationship: 'Managed Josh directly',
    date: '2022',
    text: 'Working with Josh was a pleasure. He consistently delivered high-quality solutions on time and was always willing to mentor junior team members. His AWS expertise and proactive approach to architecture made him an invaluable part of the team.',
  },
]
