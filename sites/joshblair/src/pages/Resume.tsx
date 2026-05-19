const experience = [
  {
    period: '2024 – Present',
    role: 'Founder & Principal Engineer',
    company: 'Bonefish Software & Consulting',
    bullets: [
      'Providing cloud architecture and software engineering consulting to clients.',
      'Designing and building AWS-native solutions: serverless, event-driven, and AI-powered systems.',
      'Building agentic AI applications using Claude and AWS Bedrock Agents.',
      'Full-stack development with React, TypeScript, Python, and Node.js.',
    ],
  },
  {
    period: '2015 – 2024',
    role: 'Lead Software Developer',
    company: 'Kanso Software',
    bullets: [
      'Led development of mission-critical public housing authority management software for 9+ years.',
      'Architected and maintained multi-tenant SaaS platforms serving housing agencies nationwide.',
      'Mentored junior developers and drove adoption of modern engineering practices.',
      'Delivered full-stack features across C# .NET backends, SQL Server databases, and web frontends.',
    ],
  },
  {
    period: '2010 – 2015',
    role: 'Senior Software Developer',
    company: 'Various',
    bullets: [
      'Built enterprise applications in C# .NET with SQL Server backends.',
      'Designed RESTful APIs and systems integrations for multiple clients.',
      'Transitioned early projects to cloud-hosted infrastructure.',
    ],
  },
  {
    period: 'Pre-2010',
    role: 'Software Developer',
    company: 'Various',
    bullets: [
      'Built the foundational skills across software engineering, database design, and systems development over a decade of professional work.',
    ],
  },
]

const skillGroups = [
  {
    category: 'Cloud & Infrastructure',
    items: ['AWS Bedrock', 'Lambda', 'S3', 'CloudFront', 'DynamoDB', 'SES', 'SNS', 'SQS', 'EventBridge', 'API Gateway', 'CDK', 'SAM', 'CloudFormation'],
  },
  {
    category: 'Backend',
    items: ['Python', 'Node.js', 'TypeScript', 'C# .NET', 'SQL', 'REST APIs', 'Event-Driven Architecture'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Vite', 'HTML/CSS'],
  },
  {
    category: 'AI / ML',
    items: ['Claude', 'AWS Bedrock Agents', 'RAG', 'LangChain', 'OpenSearch', 'Prompt Engineering'],
  },
]

const certifications = [
  'AWS Solutions Architect – Associate',
  'AWS Cloud Practitioner',
  'AWS Partner Accreditation – Technical',
  'Certified ScrumMaster (CSM)',
  'MCAD .NET',
  'MCP (Microsoft Certified Professional)',
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
          <button
            className="bg-[#00D4FF] text-[#111318] font-semibold px-6 py-3 rounded-lg hover:bg-[#00B8E0] transition-colors cursor-not-allowed opacity-70"
            disabled
            title="PDF download coming soon"
          >
            Download PDF
          </button>
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
                  <p className="text-sm text-[#B8C5D0] mb-3">{item.company}</p>
                  <ul className="flex flex-col gap-1.5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        <div>
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-8 pb-3 border-b border-[#2A3040]">
            Education
          </h2>
          <div className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6">
            <h3 className="text-lg font-semibold text-[#F0F4F8] mb-1">Bachelor of Science, Computer Science</h3>
            <p className="text-sm text-[#B8C5D0]">Details to be added</p>
          </div>
        </div>
      </div>
    </div>
  )
}
