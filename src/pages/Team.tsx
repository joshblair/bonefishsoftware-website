import SectionHeader from '../components/SectionHeader';
import { team } from '../data/team';

export default function Team() {
  return (
    <main className="flex-1 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Meet the Team"
          subtitle="Small team, big capabilities. We bring deep expertise and genuine care to every engagement."
        />

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-8 flex flex-col sm:flex-row gap-8"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 flex justify-center sm:block">
                  <div className="h-24 w-24 rounded-full bg-[#232936] border-2 border-[#00D4FF]/30 flex items-center justify-center text-4xl text-[#8B95A3]">
                    👤
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#F0F4F8]">{member.name}</h3>
                  <p className="text-[#00D4FF] text-sm font-medium mt-1">{member.title}</p>
                  <p className="mt-4 text-[#8B95A3] text-sm leading-relaxed">{member.bio}</p>

                  {/* Certifications */}
                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-widest text-[#8B95A3] mb-3">
                      Certifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="rounded-full border border-[#2A3040] bg-[#232936] px-3 py-1 text-xs text-[#8B95A3]"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social links */}
                  {(member.linkedin || member.github) && (
                    <div className="mt-6 flex gap-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#8B95A3] hover:text-[#00D4FF] transition-colors"
                        >
                          LinkedIn →
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#8B95A3] hover:text-[#00D4FF] transition-colors"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
