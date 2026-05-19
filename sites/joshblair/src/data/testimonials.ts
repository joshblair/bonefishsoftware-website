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
    name: 'Haile Elizondo',
    title: 'Chief Product Officer',
    relationship: 'Managed Josh directly',
    date: 'March 2026',
    text: 'I feel incredibly blessed to have worked with and gotten to know Josh Blair for over 9 years. He is an incredible team member with the ability to bring teams together in a positive and collaborative way. Josh is a proficient developer, able to take a greenfield project and architect a way forward with ease. He is an incredible co-worker, and an even better friend.',
  },
  {
    name: 'Sean DeCrescenzo',
    title: 'Data Solutions & Integrations Leader — Affordable & Public Housing Technology',
    relationship: 'Worked with Josh at Kanso Software',
    date: 'March 2026',
    text: 'I worked closely with Josh, and I can confidently say he\'s one of the most impactful Lead developers I\'ve worked with. Beyond his technical expertise, what really sets him apart is his commitment to others. He was an incredible mentor not just to junior developers, but to data engineers and teammates across the entire organization. He has a rare ability to break down complex concepts and tailor his explanations to meet people at their level, making even the most challenging topics approachable and actionable. He\'s also someone who genuinely loves the craft. Josh is constantly exploring new technologies, tools, and languages, and he stays deeply in tune with where the industry is heading. That curiosity and drive to keep learning didn\'t just elevate his own work, it raised the bar for everyone around him. Any team would be lucky to have him, not only for his technical skills, but for the culture of learning, support, and excellence he brings with him.',
  },
  {
    name: 'Sam Austin',
    title: 'Software Developer at Kanso Software',
    relationship: 'Worked with Josh on the same team',
    date: 'May 2026',
    text: 'World class developer and an exceptional individual. Josh truly cares about those around him and shows his passion with down to earth mentoring. I think any team would benefit greatly from his patient leadership. Josh is quite adept as a full stack developer. He follows good design principles across Angular, Typescript, C# and a lot more. He also has an excellent grasp of AWS services and connecting them to any private architecture. Josh is someone you want in your corner. He handles setbacks in stride and helps the whole team feel better working together. 100% recommend for colleague and good company.',
  },
  {
    name: 'William Antonio Guzman Bernal',
    title: 'Principal AWS Engineer at Sparq — AWS Community Builder',
    relationship: 'Studied together',
    date: 'April 2026',
    text: 'He\'s a very experienced software developer who consistently delivers great solutions and lifts up the people around him. His technical skills are strong, but what really stands out is how much he cares about mentoring: he\'s always willing to take the time to guide, support, and help others grow. He leads by example and creates a collaborative, learning-focused environment. Any team would be lucky to have someone with his skills and his commitment to helping others improve.',
  },
  {
    name: 'Jeffrey Olsson',
    title: 'Senior Engineering Manager at Synapse Health',
    relationship: 'Worked with Josh on the same team at Kanso',
    date: 'September 2024',
    text: 'I had the pleasure of working with Josh for two years at Kanso, and I highly recommend him for any role that values technical excellence, team collaboration, and leadership. Josh brings a wealth of experience in building web applications and services using the AWS cloud stack. His proficiency in TypeScript, C#, and Angular ensures that he consistently delivers high-quality software solutions. What truly sets Josh apart, however, is his exceptional ability to collaborate and mentor. He is one of the best team players I\'ve ever worked with, always willing to spend time helping and mentoring anyone who asks — not just his direct team members. In his personal time, Josh mentors developers fresh out of code camps, helping them refine their skills and find placements in the industry. Josh is also incredibly detail-oriented and one of the most even-keeled individuals I\'ve encountered. He handles adversity with a great sense of humor, keeping tensions low and helping teams stay focused on finding creative solutions. His experience, wisdom, and team-first attitude make him a valuable addition to any organization.',
  },
]
