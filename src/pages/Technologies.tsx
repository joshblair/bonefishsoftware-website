import SectionHeader from '../components/SectionHeader';
import { techGroups, certifications } from '../data/technologies';

const awsFeatured = new Set(['Lambda', 'S3', 'CloudFront', 'API Gateway', 'DynamoDB', 'ECS', 'Fargate']);
const awsAI = new Set(['Bedrock', 'Bedrock Knowledge Bases', 'Rekognition', 'Comprehend', 'Translate', 'Transcribe', 'Polly']);

const groupIcons: Record<string, string> = {
  'Languages': '</>',
  'Frontend': '🌐',
  'Databases': '🗃️',
  'DevOps & Containers': '🔄',
};

export default function Technologies() {
  const awsGroup = techGroups.find((g) => g.label === 'AWS Services')!;
  const otherGroups = techGroups.filter((g) => g.label !== 'AWS Services');

  return (
    <main className="flex-1 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Technologies"
          subtitle="The platforms, languages, and tools we use to deliver production-grade solutions."
        />

        {/* AWS — featured full-width card */}
        <div className="mb-8 rounded-2xl border border-[#00D4FF]/25 bg-[#1C2028] p-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">☁️</span>
            <h3 className="text-xl font-semibold text-[#00D4FF]">AWS Services</h3>
          </div>
          <p className="text-sm text-[#CBD5E1] mb-6">Core infrastructure and managed services powering every engagement</p>

          {/* All items — visually tiered */}
          <div className="flex flex-wrap gap-3 items-center">
            {awsGroup.items.map((item) => {
              if (awsFeatured.has(item)) {
                return (
                  <span key={item} className="rounded-lg border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-4 py-2 text-base font-semibold text-[#00D4FF] cursor-default">
                    {item}
                  </span>
                );
              }
              if (awsAI.has(item)) {
                return (
                  <span key={item} className="rounded-lg border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-3 py-1.5 text-sm font-medium text-[#F59E0B] cursor-default">
                    {item}
                  </span>
                );
              }
              return (
                <span key={item} className="rounded-md border border-[#2A3040] bg-[#232936] px-3 py-1.5 text-sm text-[#F0F4F8] hover:border-[#00D4FF]/40 hover:text-[#00D4FF] transition-colors cursor-default">
                  {item}
                </span>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-[#2A3040] flex flex-wrap gap-6 text-xs text-[#CBD5E1]">
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#00D4FF]/20 border border-[#00D4FF]/40" />
              Core infrastructure
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#F59E0B]/20 border border-[#F59E0B]/40" />
              AI &amp; ML services
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#232936] border border-[#2A3040]" />
              Supporting services
            </span>
          </div>
        </div>

        {/* Other tech groups — 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {otherGroups.map((group, i) => {
            const isCyan = i % 2 === 0;
            const accentColor = isCyan ? 'text-[#00D4FF]' : 'text-[#F59E0B]';
            const borderColor = isCyan ? 'border-[#00D4FF]/20' : 'border-[#F59E0B]/20';
            return (
              <div key={group.label} className={`rounded-xl border ${borderColor} bg-[#1C2028] p-6`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{groupIcons[group.label] ?? '•'}</span>
                  <h3 className={`text-base font-semibold ${accentColor}`}>{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-[#2A3040] bg-[#232936] px-3 py-1.5 text-sm text-[#F0F4F8] hover:border-[#00D4FF]/40 hover:text-[#00D4FF] transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="rounded-xl border border-[#F59E0B]/20 bg-[#1C2028] p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">🏆</span>
            <h3 className="text-xl font-semibold text-[#F59E0B]">Certifications &amp; Credentials</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert, i) => (
              <div
                key={cert.short}
                className="flex items-center gap-3 rounded-md border border-[#2A3040] bg-[#232936] px-4 py-3"
              >
                <span className={`h-2 w-2 rounded-full flex-shrink-0 ${i % 2 === 0 ? 'bg-[#00D4FF]' : 'bg-[#F59E0B]'}`} />
                <span className="text-sm text-[#F0F4F8]">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
