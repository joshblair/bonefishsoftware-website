import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { services } from '../data/services';

export default function Services() {
  return (
    <main className="flex-1 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Services"
          subtitle="End-to-end software and cloud engineering — from greenfield builds to legacy modernization."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6 hover:border-[#00D4FF]/50 transition-colors group flex flex-col"
            >
              <div className="text-3xl mb-4">{svc.icon}</div>
              <h3 className="text-lg font-semibold text-[#F0F4F8] mb-3 group-hover:text-[#00D4FF] transition-colors">
                {svc.title}
              </h3>
              <p className="text-[#8B95A3] text-sm leading-relaxed flex-1">{svc.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-[#00D4FF]/20 bg-[#1C2028] p-8 text-center">
          <h3 className="text-xl font-semibold text-[#F0F4F8] mb-3">
            Need something not listed here?
          </h3>
          <p className="text-[#8B95A3] mb-6 max-w-lg mx-auto">
            Every project is different. Reach out and let's figure out together how we can help.
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-md bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#111318] hover:bg-[#00a8cc] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
