import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { certifications } from '../data/technologies';
import topoBg from '../assets/pngtree-topographic-map-background-illustration-vector-picture-image_16621270.jpg';

export default function Home() {
  const featuredServices = services.slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Topo map background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url(${topoBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-28 text-center">
          {/* Hero logo — transparent, floats over topo background */}
          <div className="flex justify-center mb-8">
            <img src="/logo.svg" alt="Bonefish Software & Consulting" className="h-32 w-auto" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0F1F35] tracking-tight leading-tight">
            Cloud-Native Software.
            <br />
            <span className="text-[#002868]">Engineered for Scale.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#3D4E63] max-w-2xl mx-auto leading-relaxed">
            Custom software development, AWS cloud architecture, event-driven systems, and AI
            integration for businesses that need solutions that scale.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="rounded-md bg-[#002868] px-6 py-3 text-sm font-semibold text-white hover:bg-[#001f52] transition-colors"
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-[#3D4E63] px-6 py-3 text-sm font-semibold text-[#0F1F35] hover:border-[#002868] hover:text-[#002868] transition-colors"
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
