const techStack = [
  {
    category: 'Cloud',
    items: ['AWS Bedrock', 'Lambda', 'S3', 'CloudFront', 'DynamoDB', 'SES', 'CDK', 'SAM'],
  },
  {
    category: 'Backend',
    items: ['Python', 'Node.js', 'TypeScript', 'C# .NET', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'AI / ML',
    items: ['Claude', 'Bedrock Agents', 'RAG', 'LangChain', 'OpenSearch'],
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

const timeline = [
  {
    year: '2024 – Present',
    role: 'Founder & Principal Engineer',
    company: 'Bonefish Software & Consulting',
    description: 'Providing cloud architecture and software engineering consulting. Focused on AWS-native solutions, agentic AI systems, and serverless architectures.',
  },
  {
    year: '2015 – 2024',
    role: 'Lead Software Developer',
    company: 'Kanso Software',
    description: 'Led development of mission-critical housing authority management systems. Designed and built full-stack applications serving public housing agencies across the country.',
  },
  {
    year: '2010 – 2015',
    role: 'Senior Software Developer',
    company: 'Various',
    description: 'Built enterprise applications in C# .NET, SQL Server, and early cloud technologies. Focused on data architecture, API design, and systems integration.',
  },
  {
    year: 'Early Career',
    role: 'Software Developer',
    company: 'Various',
    description: 'Over a decade building the foundational skills in software engineering, database design, and systems development that underpin a 30+ year career.',
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
                I'm a software engineer and AWS cloud architect with over 30 years of experience designing and building systems that people depend on. I started writing code when the web was young and I've never stopped learning since.
              </p>
              <p>
                For most of the past decade, I led software development at Kanso Software, where I helped build and maintain complex housing authority management systems used by public housing agencies nationwide. That work taught me a great deal about long-lived systems, reliability under pressure, and the importance of clear communication with stakeholders.
              </p>
              <p>
                Today, through Bonefish Software & Consulting, I focus on helping teams and organizations move confidently to the cloud. I specialize in AWS-native architectures — serverless, event-driven, and increasingly AI-powered — with a particular interest in agentic systems built on Claude and AWS Bedrock.
              </p>
              <p>
                I care about building things that work. Not just on launch day, but for the long haul. I write clean code, design resilient systems, and take mentorship seriously.
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
