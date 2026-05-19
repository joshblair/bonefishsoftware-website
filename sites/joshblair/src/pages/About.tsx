const techStack = [
  {
    category: 'AWS Cloud',
    items: ['Lambda', 'Fargate', 'ECS / ECR', 'S3', 'CloudFront', 'API Gateway', 'SQS', 'SNS', 'EventBridge', 'DynamoDB', 'RDS', 'Bedrock', 'Bedrock Knowledge Bases', 'Bedrock Guardrails', 'CloudFormation', 'CDK', 'SAM', 'CloudWatch', 'IAM', 'Route 53'],
  },
  {
    category: 'Back-End',
    items: ['.NET Core', 'C# .NET', 'Entity Framework', 'Node.js', 'Python', 'Django', 'Boto3', 'RESTful APIs', 'GraphQL'],
  },
  {
    category: 'Front-End',
    items: ['Angular (up to 17)', 'AngularJS', 'TypeScript', 'JavaScript', 'React', 'HTML / CSS', 'MEAN Stack'],
  },
  {
    category: 'Databases',
    items: ['MS SQL Server', 'MongoDB', 'PostgreSQL', 'MySQL / MariaDB', 'DynamoDB'],
  },
  {
    category: 'DevOps & CI/CD',
    items: ['GitLab CI/CD', 'Bitbucket CI/CD', 'AWS CodePipeline', 'Docker', 'GitHub Actions', 'EKS'],
  },
  {
    category: 'AI / Agentic',
    items: ['Claude', 'AWS Bedrock Agents', 'RAG', 'Bedrock Knowledge Bases', 'Rekognition', 'Comprehend', 'Prompt Engineering'],
  },
]

const certifications = [
  'AWS Certified Solutions Architect – Associate (2023)',
  'AWS Certified Cloud Practitioner (2021)',
  'AWS Partner: Accreditation (Technical) (2024)',
  'Introduction to FDC3 — LFEL1000, Linux Foundation (2025)',
  'Certified ScrumMaster (2015)',
  'Microsoft Certified Application Developer: .NET (2007)',
  'Microsoft Certified Professional (2005)',
]

const timeline = [
  {
    year: '2017 – Present',
    role: 'Owner / Senior Software Engineer / Solutions Architect',
    company: 'Bonefish Software & Consulting, LLC',
    description: 'Providing custom software development and AWS cloud architecture consulting. Focused on serverless, event-driven, and agentic AI-powered systems built on AWS Bedrock and Claude.',
  },
  {
    year: '2017 – 2026',
    role: 'Lead Software Engineer',
    company: 'Kanso Software',
    description: 'Led development of a SaaS housing platform serving 220+ housing authorities, processing $38M+ in annual transactions across 100K+ units with 99.99% uptime — reducing operational costs by 35%. Architected full MEAN stack and AWS serverless infrastructure; led a team of 6+ engineers.',
  },
  {
    year: '2012 – 2017',
    role: 'Senior Software Engineer, Project Lead',
    company: 'The Regis Company',
    description: 'Built complex SaaS business simulations for Fortune 500 clients including EY, Deloitte, Accenture, Abbott, and Northwestern Mutual. Led teams through high-pressure real-time simulation scenarios involving 40–50 competing teams.',
  },
  {
    year: '2010 – 2012',
    role: 'Development Lead / Senior .NET Developer',
    company: 'GoDaddy',
    description: 'Built a Content Delivery System that cut deployment times from 8+ hours to 10 minutes. Developed landing pages and e-commerce systems for one of the world\'s largest domain registrars.',
  },
  {
    year: '1996 – 2010',
    role: 'Senior Software Engineer',
    company: 'Softbrands (Infor) · HydraForce',
    description: 'Built the foundation: MRP/ERP systems, manufacturing automation, e-commerce platforms, and enterprise integrations across two decades of professional software development.',
  },
]

export default function About() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-20">
          <div className="flex-shrink-0">
            <div className="w-36 h-36 rounded-full bg-[#2A3040] border-2 border-[#2A3040] flex items-center justify-center">
              <svg className="w-20 h-20 text-[#B8C5D0]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F4F8] mb-2">Josh Blair</h1>
            <p className="text-xl text-[#00D4FF] font-semibold mb-6">Software Engineer & AWS Cloud Architect</p>
            <div className="flex flex-col gap-4 text-[#CBD5E1] leading-relaxed max-w-2xl">
              <p>
                I'm an AWS Certified Solutions Architect and cloud developer with 30+ years of experience in software engineering, cloud architecture, and enterprise application modernization. Over the past decade I've specialized in designing and implementing scalable, cost-efficient, and secure cloud solutions using AWS.
              </p>
              <p>
                My most recent role was Lead Software Engineer at Kanso Software, where I helped architect and scale a SaaS platform serving 220+ housing authorities — processing $38M+ in annual transactions across 100K+ units, with 99.99% uptime and a 35% reduction in operational costs. I led a team of 6+ engineers, championed DevOps practices that cut deployment times by 60%, and delivered 50+ customer-facing features.
              </p>
              <p>
                Today, through Bonefish Software & Consulting, I focus on AWS-native architectures — serverless, event-driven, and AI-powered — with a growing specialty in agentic systems built on Claude and AWS Bedrock. I'm also completing the AWS Cloud Institute Certified Cloud Developer program, which has deepened my hands-on experience with containers, Bedrock AI/ML services, and advanced IaC patterns.
              </p>
              <p>
                I care about building systems that are reliable, maintainable, and actually help the people who use them. I'm known for being approachable, collaborative, and able to explain technical concepts clearly to both engineers and business stakeholders.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#F0F4F8] mb-10">Career Highlights</h2>
          <div className="relative flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#00D4FF] mt-1.5 flex-shrink-0" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-grow bg-[#2A3040] my-1" />
                  )}
                </div>
                <div className="pb-10">
                  <p className="text-xs text-[#00D4FF] font-medium mb-1">{item.year}</p>
                  <h3 className="text-lg font-semibold text-[#F0F4F8]">{item.role}</h3>
                  <p className="text-sm text-[#B8C5D0] mb-2">{item.company}</p>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-xl">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#F0F4F8] mb-10">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((group) => (
              <div key={group.category} className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6">
                <h3 className="text-sm font-semibold text-[#00D4FF] uppercase tracking-wider mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#2A3040] bg-[#232936] px-3 py-1 text-xs text-[#CBD5E1]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#F0F4F8] mb-10">Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] px-6 py-4 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#00D4FF] flex-shrink-0" />
                <span className="text-sm text-[#CBD5E1]">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
