import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { certifications } from '../data/technologies';

export default function Home() {
  const featuredServices = services.slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Data flow background */}
        <div className="absolute inset-0 bg-[#111318] pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 700"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <defs>
              <radialGradient id="heroGlow" cx="50%" cy="44%" r="38%">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle center glow */}
            <rect width="1440" height="700" fill="url(#heroGlow)" />

            {/* Regular streams — white, mix of solid and dashed */}
            <path d="M 0,32 C 240,24 480,40 720,30 S 1100,37 1440,32" stroke="white" strokeWidth="0.8" opacity="0.08" />
            <path d="M 0,68 C 180,60 420,74 700,64 S 1050,72 1440,68" stroke="white" strokeWidth="0.8" opacity="0.07" strokeDasharray="8 5" />
            <path d="M 0,142 C 200,134 450,150 720,140 S 1080,148 1440,142" stroke="white" strokeWidth="0.8" opacity="0.08" strokeDasharray="6 8" />
            <path d="M 0,178 C 280,168 530,188 800,174 S 1150,182 1440,178" stroke="white" strokeWidth="0.8" opacity="0.07" />
            <path d="M 0,212 C 160,204 380,220 660,210 S 1020,218 1440,212" stroke="white" strokeWidth="0.8" opacity="0.09" strokeDasharray="12 4" />
            <path d="M 0,288 C 220,278 480,298 760,284 S 1100,294 1440,288" stroke="white" strokeWidth="0.8" opacity="0.07" strokeDasharray="8 6" />
            <path d="M 0,322 C 260,312 520,334 800,320 S 1160,330 1440,322" stroke="white" strokeWidth="0.8" opacity="0.08" />
            <path d="M 0,362 C 180,352 420,370 700,358 S 1080,368 1440,362" stroke="white" strokeWidth="0.8" opacity="0.07" strokeDasharray="5 9" />
            <path d="M 0,438 C 240,428 490,448 770,434 S 1100,444 1440,438" stroke="white" strokeWidth="0.8" opacity="0.08" strokeDasharray="10 5" />
            <path d="M 0,472 C 200,462 440,482 720,469 S 1060,479 1440,472" stroke="white" strokeWidth="0.8" opacity="0.07" />
            <path d="M 0,512 C 280,500 550,524 830,510 S 1180,520 1440,512" stroke="white" strokeWidth="0.8" opacity="0.09" strokeDasharray="6 7" />
            <path d="M 0,548 C 160,538 390,558 680,544 S 1040,554 1440,548" stroke="white" strokeWidth="0.8" opacity="0.07" />
            <path d="M 0,622 C 240,610 490,634 780,619 S 1120,630 1440,622" stroke="white" strokeWidth="0.8" opacity="0.08" strokeDasharray="9 5" />
            <path d="M 0,660 C 200,650 450,670 740,656 S 1100,666 1440,660" stroke="white" strokeWidth="0.7" opacity="0.06" />

            {/* Cyan accent / index streams */}
            <path d="M 0,102 C 300,92 550,114 820,100 S 1200,108 1440,102" stroke="#00D4FF" strokeWidth="1.2" opacity="0.18" />
            <path d="M 0,252 C 320,240 600,264 880,250 S 1220,260 1440,252" stroke="#00D4FF" strokeWidth="1.2" opacity="0.15" />
            <path d="M 0,402 C 300,390 580,414 860,400 S 1200,410 1440,402" stroke="#00D4FF" strokeWidth="1.2" opacity="0.18" />
            <path d="M 0,582 C 320,570 600,594 880,579 S 1220,590 1440,582" stroke="#00D4FF" strokeWidth="1.2" opacity="0.14" />

            {/* Short burst streams — partial width */}
            <path d="M 180,52 C 360,44 540,60 720,50" stroke="#00D4FF" strokeWidth="0.8" opacity="0.12" strokeDasharray="4 6" />
            <path d="M 600,150 C 780,142 960,158 1140,146" stroke="white" strokeWidth="0.8" opacity="0.10" />
            <path d="M 50,384 C 230,376 410,392 590,380" stroke="white" strokeWidth="0.8" opacity="0.08" strokeDasharray="7 5" />
            <path d="M 820,480 C 980,470 1140,490 1300,478" stroke="#00D4FF" strokeWidth="0.8" opacity="0.12" />
            <path d="M 300,560 C 480,550 660,570 840,558" stroke="white" strokeWidth="0.8" opacity="0.09" strokeDasharray="5 8" />

            {/* Data packet dots */}
            <circle cx="285" cy="101" r="2.5" fill="#00D4FF" opacity="0.35" />
            <circle cx="720" cy="99" r="2" fill="#00D4FF" opacity="0.25" />
            <circle cx="1100" cy="103" r="2.5" fill="#00D4FF" opacity="0.30" />
            <circle cx="420" cy="251" r="2.5" fill="#00D4FF" opacity="0.30" />
            <circle cx="880" cy="248" r="2" fill="#00D4FF" opacity="0.25" />
            <circle cx="1260" cy="253" r="2.5" fill="#00D4FF" opacity="0.28" />
            <circle cx="580" cy="401" r="2.5" fill="#00D4FF" opacity="0.32" />
            <circle cx="960" cy="398" r="2" fill="#00D4FF" opacity="0.22" />
            <circle cx="160" cy="582" r="2" fill="#00D4FF" opacity="0.20" />
            <circle cx="760" cy="580" r="2.5" fill="#00D4FF" opacity="0.28" />
            <circle cx="1180" cy="584" r="2" fill="#00D4FF" opacity="0.22" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-28 text-center">
          {/* Hero logo — soft ambient glow lifts it off the dark background */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 -m-6 bg-[#1C2028]/70 blur-2xl rounded-full" />
              <img src="/logo.svg" alt="Bonefish Software & Consulting" className="relative h-44 w-auto" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F0F4F8] tracking-tight leading-tight">
            Cloud-Native Software.
            <br />
            <span className="text-[#00D4FF]">Engineered for Scale.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
            Custom software development, AWS cloud architecture, event-driven systems, and AI
            integration for businesses that need solutions that scale.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="rounded-md bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#111318] hover:bg-[#00a8cc] transition-colors"
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-[#2A3040] px-6 py-3 text-sm font-semibold text-[#F0F4F8] hover:border-[#00D4FF] hover:text-[#00D4FF] transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-[#1C2028]/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#00D4FF] tracking-tight">
              What We Build
            </h2>
            <p className="mt-4 text-[#CBD5E1] text-lg max-w-2xl mx-auto">
              From architecture to deployment — end-to-end engineering for modern cloud applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((svc, i) => (
              <div
                key={svc.id}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6 hover:border-[#00D4FF]/50 transition-colors group"
              >
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 transition-colors group-hover:text-[#00D4FF] ${i === 1 ? 'text-[#F59E0B]' : 'text-[#F0F4F8]'}`}>
                  {svc.title}
                </h3>
                <p className="text-[#CBD5E1] text-sm leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="text-base font-semibold text-[#00D4FF] hover:text-[#00a8cc] transition-colors"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications strip */}
      <section className="py-12 border-y border-[#2A3040]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#CBD5E1] mb-6">
            Certifications &amp; Credentials
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <span
                key={cert.short}
                title={cert.name}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  i % 2 === 0
                    ? 'border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]'
                    : 'border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]'
                }`}
              >
                {cert.short}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#00D4FF]/20 bg-gradient-to-br from-[#1C2028] to-[#232936] p-10 text-center">
            <h2 className="text-3xl font-semibold text-[#00D4FF] mb-4">
              Ready to build something great?
            </h2>
            <p className="text-[#CBD5E1] mb-8 max-w-xl mx-auto">
              Whether you're migrating to the cloud, building a new product, or integrating AI —
              let's talk about what's possible.
            </p>
            <Link
              to="/contact"
              className="inline-block rounded-md bg-[#00D4FF] px-8 py-3 text-sm font-semibold text-[#111318] hover:bg-[#00a8cc] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
