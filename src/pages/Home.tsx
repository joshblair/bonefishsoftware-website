import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { certifications } from '../data/technologies';

export default function Home() {
  const featuredServices = services.slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111318] via-[#1C2028] to-[#111318] pointer-events-none" />

        {/* Topo map overlay */}
        <div className="absolute top-0 left-0 right-0 h-2/3 overflow-hidden pointer-events-none">
          <svg
            className="w-full h-full opacity-[0.06]"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
            strokeWidth="1.2"
          >
            <ellipse cx="600" cy="220" rx="560" ry="380" />
            <ellipse cx="600" cy="220" rx="480" ry="310" />
            <ellipse cx="600" cy="220" rx="400" ry="245" />
            <ellipse cx="600" cy="220" rx="320" ry="185" />
            <ellipse cx="600" cy="220" rx="240" ry="130" />
            <ellipse cx="600" cy="220" rx="160" ry="85" />
            <ellipse cx="600" cy="220" rx="80" ry="42" />
            <ellipse cx="180" cy="80" rx="280" ry="190" strokeWidth="0.7" />
            <ellipse cx="1020" cy="120" rx="240" ry="160" strokeWidth="0.7" />
            <ellipse cx="80"  cy="500" rx="180" ry="130" strokeWidth="0.5" />
            <ellipse cx="1120" cy="480" rx="160" ry="120" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-28 text-center">
          {/* Hero logo */}
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl bg-[#1C2028] px-10 py-6 shadow-lg shadow-black/50">
              <img src="/logo.svg" alt="Bonefish Software & Consulting" className="h-32 w-auto" />
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
