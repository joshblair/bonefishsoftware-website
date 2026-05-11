import SectionHeader from '../components/SectionHeader';
import { techGroups, certifications } from '../data/technologies';

export default function Technologies() {
  return (
    <main className="flex-1 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Technologies"
          subtitle="The platforms, languages, and tools we use to deliver production-grade solutions."
        />

        <div className="space-y-10">
          {techGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs uppercase tracking-widest text-[#00D4FF] mb-4 font-medium">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-[#2A3040] bg-[#1C2028] px-3 py-1.5 text-sm text-[#F0F4F8] hover:border-[#00D4FF]/50 hover:text-[#00D4FF] transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 rounded-xl border border-[#2A3040] bg-[#1C2028] p-8">
          <h3 className="text-xs uppercase tracking-widest text-[#00D4FF] mb-6 font-medium">
            Certifications &amp; Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div
                key={cert.short}
                className="flex items-center gap-3 rounded-md border border-[#2A3040] bg-[#232936] px-4 py-3"
              >
                <span className="h-2 w-2 rounded-full bg-[#00D4FF] flex-shrink-0" />
                <span className="text-sm text-[#F0F4F8]">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
