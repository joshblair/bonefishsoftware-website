import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] mb-4">What People Say</h1>
          <p className="text-[#CBD5E1] max-w-2xl">
            Recommendations from LinkedIn colleagues and clients.
          </p>
        </div>

        <div className="flex flex-col gap-6 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-8 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                <p className="text-[#00D4FF] text-5xl font-serif leading-none">"</p>
                <p className="text-[#CBD5E1] leading-relaxed text-lg italic">"{t.text}"</p>
              </div>
              <div className="flex items-start justify-between flex-wrap gap-4 pt-4 border-t border-[#2A3040]">
                <div>
                  <p className="font-semibold text-[#F0F4F8]">{t.name}</p>
                  <p className="text-sm text-[#B8C5D0] mt-0.5">{t.title}</p>
                  <p className="text-sm text-[#B8C5D0]">{t.relationship}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#B8C5D0]">{t.date}</p>
                  {t.linkedinUrl && (
                    <a
                      href={t.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#00D4FF] hover:text-[#00B8E0] transition-colors mt-1 inline-block"
                    >
                      View on LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center rounded-xl border border-[#2A3040] bg-[#1C2028] p-8">
          <p className="text-[#CBD5E1] mb-4">
            See all recommendations on my LinkedIn profile.
          </p>
          <a
            href="https://linkedin.com/in/joshblair/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00D4FF] text-[#111318] font-semibold px-6 py-3 rounded-lg hover:bg-[#00B8E0] transition-colors inline-block"
          >
            View LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  )
}
