import { useState } from 'react';
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
          <div className="w-full max-w-3xl space-y-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-8"
              >
                <div className="flex flex-col sm:flex-row gap-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0 flex justify-center sm:block">
                    <Avatar photo={member.photo} name={member.name} />
                  </div>

                  {/* Header info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-semibold text-[#F0F4F8]">{member.name}</h3>
                    <p className="text-[#00D4FF] text-sm font-medium mt-1 leading-snug">{member.title}</p>

                    {/* Social links */}
                    {(member.linkedin || member.github) && (
                      <div className="mt-4 flex gap-5">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#8B95A3] hover:text-[#00D4FF] transition-colors"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#8B95A3] hover:text-[#00D4FF] transition-colors"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio paragraphs */}
                <div className="mt-6 space-y-4">
                  {member.bio.map((paragraph, i) => (
                    <p key={i} className="text-[#8B95A3] text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Certifications */}
                <div className="mt-8 pt-6 border-t border-[#2A3040]">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Avatar({ photo, name }: { photo?: string; name: string }) {
  const [errored, setErrored] = useState(false);

  if (photo && !errored) {
    return (
      <img
        src={photo}
        alt={name}
        onError={() => setErrored(true)}
        className="h-28 w-28 rounded-full object-cover border-2 border-[#00D4FF]/30"
      />
    );
  }

  return (
    <div className="h-28 w-28 rounded-full bg-[#232936] border-2 border-[#00D4FF]/30 flex items-center justify-center text-4xl text-[#8B95A3]">
      👤
    </div>
  );
}
