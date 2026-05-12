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
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-28 text-center">
          {/* Hero logo */}
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl border border-[#00D4FF]/20 bg-[#1C2028] px-10 py-6 shadow-lg shadow-black/40">
              <img src="/logo.svg" alt="Bonefish Software & Consulting" className="h-32 w-auto" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-1.5 text-sm text-[#00D4FF] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            AWS Certified Solution Architect
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F0F4F8] tracking-tight leading-tight">
            Cloud-Native Software.
            <br />
            <span className="text-[#00D4FF]">Built to Last.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#B8C5D0] max-w-2xl mx-auto leading-relaxed">
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
            <p className="mt-4 text-[#B8C5D0] text-lg max-w-2xl mx-auto">
              From architecture to deployment — end-to-end engineering for modern cloud applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((svc) => (
              <div
                key={svc.id}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6 hover:border-[#00D4FF]/50 transition-colors group"
              >
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3 className="text-lg font-semibold text-[#F0F4F8] mb-2 group-hover:text-[#00D4FF] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-[#B8C5D0] text-sm leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="text-sm font-medium text-[#00D4FF] hover:text-[#00a8cc] transition-colors"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications strip */}
      <section className="py-12 border-y border-[#2A3040]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-[#B8C5D0] mb-6">
            Certifications &amp; Credentials
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert.short}
                title={cert.name}
                className="rounded-full border border-[#2A3040] bg-[#1C2028] px-3 py-1 text-xs font-medium text-[#B8C5D0]"
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
            <p className="text-[#B8C5D0] mb-8 max-w-xl mx-auto">
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
