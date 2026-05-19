const experience = [
  {
    period: '2017 – Present',
    role: 'Owner / Senior Software Engineer / Solutions Architect',
    company: 'Bonefish Software & Consulting, LLC — Golden, Colorado',
    bullets: [
      'Custom software development and AWS cloud architecture and engineering.',
      'Designing and building AWS-native solutions: serverless, event-driven, and AI-powered systems.',
      'Building agentic AI applications using Claude, AWS Bedrock Agents, and Bedrock Knowledge Bases.',
    ],
  },
  {
    period: '2017 – 3/2026',
    role: 'Lead Software Engineer',
    company: 'Kanso Software — Denver, Colorado',
    context: 'SaaS Next-Gen Housing Platform',
    bullets: [
      'Architected and scaled SaaS platform serving 220+ housing authorities, processing $38M+ in annual transactions across 100K+ units with 99.99% uptime, reducing operational costs by 35%.',
      'Designed and built a scalable MEAN stack platform with AWS serverless and event-driven architecture — SQS, SNS, Lambda, EventBridge, API Gateway, RDS, DynamoDB, ECS, Fargate, CloudFront, S3, CloudFormation, CDK, and SAM.',
      'Led architectural design discussions and code reviews for a team of 6+ engineers, establishing coding standards and design patterns that reduced defect rates and improved code maintainability.',
      'Mentored junior and mid-level developers on .NET Core microservices, AWS Serverless patterns, and Angular component-based development.',
      'Championed DevOps practices by implementing CI/CD pipelines with GitLab CI/CD and BitBucket CI/CD, reducing deployment time by 60% and enabling daily production releases with automated testing.',
      'Leveraged AI tools including AWS Bedrock, Bedrock Knowledge Bases, Bedrock Guardrails, Anthropic Claude Code, AWS Kiro, and Windsurf for agentic code generation, testing, and documentation.',
      'Collaborated cross-functionally with UX, product owner, and QA using Agile/Scrum to deliver 50+ customer-facing features.',
    ],
  },
  {
    period: '2012 – 2017',
    role: 'Senior Software Engineer, Project Lead',
    company: 'The Regis Company — Golden, Colorado',
    context: 'SaaS Next-Gen Learning Simulations',
    bullets: [
      'Developed highly customized business simulations used by senior managers and C-Suite executives at Fortune 500 companies including EY, Deloitte, Accenture, Abbott, and Northwestern Mutual.',
      'Served as Team Lead on multiple projects involving 40–50 teams competing in real-time under high-pressure scenarios with intricate scoring models.',
      'Stack: C# .NET, ASP.NET, IIS, SQL Server, JavaScript, CSS, HTML, MVVM, SPA, Jenkins, VSTS/Azure DevOps CI/CD, Azure.',
    ],
  },
  {
    period: '2010 – 2012',
    role: 'Development Lead / Senior .NET Developer',
    company: 'GoDaddy — Denver, Colorado',
    context: 'CDS & E-commerce',
    bullets: [
      'Reduced deployment times from 8+ hours to 10 minutes by building a Content Delivery System (CDS) and its management UI, including an archival system for legal compliance.',
      'Built a RESTful Content Delivery Service delivering JSON content dynamically to sales landing pages.',
      'Redesigned central navigation across GoDaddy.com, My Account, Cart, and Videos platforms.',
      'Completed large-scale multi-currency conversion projects ensuring accurate global pricing.',
      'Stack: C# .NET, HTML, CSS, JavaScript, jQuery, SQL Server, MongoDB.',
    ],
  },
  {
    period: '2005 – 2010',
    role: 'Senior Software Engineer / DBA / Project Manager',
    company: 'HydraForce, Inc. — Remote',
    bullets: [
      'Developed and maintained internal and external applications including custom manufacturing software, ERP integration, Intranet, Supplier and Customer Extranets, and B2B integrations.',
      'SQL Server database development, maintenance, and administration; source code revision control administration (Subversion); ERP maintenance.',
    ],
  },
  {
    period: '1996 – 2005',
    role: 'Senior Software Engineer (MRP/ERP & E-commerce)',
    company: 'Softbrands, Inc. (an Infor company) — Golden, Colorado',
    bullets: [
      'Designed and developed Lean Automation software for the manufacturing industry using C# .NET, SQL Server, SSRS, and WinForms.',
      'Built a scalable e-commerce system integrating with legacy ERP systems, credit card processing, third-party shipping, and custom pricing modules.',
      'Built web-based Supplier Center and Customer Center extranet systems integrated with the Fourth Shift ERP system.',
      'Optimized data management by designing SQL structures including stored procedures, views, and UDFs.',
    ],
  },
]

const skillGroups = [
  {
    category: 'AWS Cloud',
    items: ['Lambda', 'Fargate', 'ECS', 'ECR', 'S3', 'CloudFront', 'API Gateway', 'SQS', 'SNS', 'EventBridge', 'DynamoDB', 'RDS', 'Bedrock', 'Bedrock Knowledge Bases', 'Bedrock Guardrails', 'Rekognition', 'CloudWatch', 'IAM', 'Route 53', 'CloudFormation', 'CDK', 'SAM'],
  },
  {
    category: 'Back-End',
    items: ['.NET Core', 'C# .NET', 'Entity Framework', 'Node.js', 'Python', 'Django', 'Boto3', 'RESTful APIs', 'GraphQL'],
  },
  {
    category: 'Front-End',
    items: ['Angular (up to 17)', 'AngularJS', 'TypeScript', 'JavaScript', 'React', 'HTML', 'CSS', 'MEAN Stack', 'SPA'],
  },
  {
    category: 'Databases',
    items: ['MS SQL Server', 'MongoDB', 'PostgreSQL', 'MySQL / MariaDB', 'DynamoDB'],
  },
  {
    category: 'DevOps & CI/CD',
    items: ['GitLab CI/CD', 'Bitbucket CI/CD', 'AWS CodePipeline', 'AWS CodeBuild', 'Docker', 'GitHub Actions', 'EKS', 'Subversion'],
  },
  {
    category: 'Testing & Tools',
    items: ['NUnit', 'xUnit', 'TDD', 'Postman', 'Swagger', 'X-Ray / OTEL', 'Unit Testing', 'Integration Testing', 'Performance Testing'],
  },
]

const certifications = [
  { name: 'AWS Certified Solutions Architect – Associate (SAA)', year: '2023' },
  { name: 'AWS Certified Cloud Practitioner (CCP)', year: '2021' },
  { name: 'AWS Partner: Accreditation (Technical)', year: '2024' },
  { name: 'Introduction to FDC3 — LFEL1000 (Linux Foundation)', year: '2025' },
  { name: 'Certified ScrumMaster (CSM)', year: '2015' },
  { name: 'Microsoft Certified Application Developer: .NET (MCAD)', year: '2007' },
  { name: 'Microsoft Certified Professional (MCP)', year: '2005' },
]

const education = [
  {
    school: 'AWS Cloud Institute (ACI)',
    degree: 'Certified Cloud Developer',
    period: '03/2026 (expected)',
    highlights: [
      'Scalable, high-availability architectures with EC2, RDS, DynamoDB, S3, SQS, SNS, and CloudFront.',
      'CI/CD automation with CodePipeline, CodeBuild, CodeDeploy, and GitHub Actions.',
      'Container computing with Docker, ECR, ECS, Fargate, and EKS.',
      'AI/ML applications with Bedrock, Bedrock Knowledge Bases (RAG), Rekognition, Comprehend, Transcribe, and Polly.',
      '100+ interactive AWS labs and two capstone projects.',
    ],
  },
  {
    school: 'University of Louisiana',
    degree: 'Bachelor of Science in Industrial Technology',
    period: '',
    highlights: [],
  },
]

export default function Resume() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] mb-2">Resume</h1>
            <p className="text-[#CBD5E1]">30+ years of software engineering and cloud architecture.</p>
          </div>
          <a
            href="/josh-blair-resume.pdf"
            download
            className="bg-[#00D4FF] text-[#111318] font-semibold px-6 py-3 rounded-lg hover:bg-[#00B8E0] transition-colors inline-block"
          >
            Download PDF
          </a>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-8 pb-3 border-b border-[#2A3040]">
            Experience
          </h2>
          <div className="flex flex-col gap-0">
            {experience.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#00D4FF] mt-1.5 flex-shrink-0" />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-grow bg-[#2A3040] my-1" />
                  )}
                </div>
                <div className="pb-10">
                  <p className="text-xs text-[#00D4FF] font-medium mb-1">{item.period}</p>
                  <h3 className="text-lg font-semibold text-[#F0F4F8]">{item.role}</h3>
                  <p className="text-sm text-[#B8C5D0] mb-1">{item.company}</p>
                  {'context' in item && (
                    <p className="text-xs text-[#CBD5E1] italic mb-3">{item.context}</p>
                  )}
                  <ul className="flex flex-col gap-1.5 mt-2">
                    {item.bullets.map((bullet, j) => (
                      <li key={j} className="text-sm text-[#CBD5E1] flex gap-2">
                        <span className="text-[#00D4FF] mt-0.5 flex-shrink-0">–</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-8 pb-3 border-b border-[#2A3040]">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
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

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-8 pb-3 border-b border-[#2A3040]">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] px-6 py-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00D4FF] flex-shrink-0" />
                  <span className="text-sm text-[#CBD5E1]">{cert.name}</span>
                </div>
                <span className="text-xs text-[#B8C5D0] flex-shrink-0">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-8 pb-3 border-b border-[#2A3040]">
            Education
          </h2>
          <div className="flex flex-col gap-6">
            {education.map((edu) => (
              <div key={edu.school} className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[#F0F4F8]">{edu.school}</h3>
                    <p className="text-sm text-[#00D4FF]">{edu.degree}</p>
                  </div>
                  {edu.period && (
                    <span className="text-xs text-[#B8C5D0] flex-shrink-0 mt-1">{edu.period}</span>
                  )}
                </div>
                {edu.highlights.length > 0 && (
                  <ul className="flex flex-col gap-1.5 mt-4">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-[#CBD5E1] flex gap-2">
                        <span className="text-[#00D4FF] mt-0.5 flex-shrink-0">–</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
