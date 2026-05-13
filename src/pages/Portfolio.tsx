import SectionHeader from '../components/SectionHeader';

const placeholders = [
  {
    title: 'Coming Soon',
    category: 'Cloud Architecture',
    description: 'A case study on a serverless event-driven migration will be posted here.',
  },
  {
    title: 'Coming Soon',
    category: 'AI Integration',
    description: 'An AI-powered application built with AWS Bedrock and Knowledge Bases.',
  },
  {
    title: 'Coming Soon',
    category: 'Custom Software',
    description: 'A full-stack .NET and React application delivering real business value.',
  },
];

export default function Portfolio() {
  return (
    <main className="flex-1 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Portfolio"
          subtitle="Real projects. Real results. Case studies and highlights coming soon."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#2A3040] border-dashed bg-[#1C2028] p-6 flex flex-col gap-3"
            >
              <span className="text-xs uppercase tracking-widest text-[#00D4FF] font-medium">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold text-[#F0F4F8]">{item.title}</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-[#CBD5E1]">
          Portfolio projects are added as they become available.{' '}
          <span className="text-[#F0F4F8]">Check back soon.</span>
        </p>
      </div>
    </main>
  );
}
