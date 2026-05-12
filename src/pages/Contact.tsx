import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const apiUrl = import.meta.env.VITE_CONTACT_API_URL;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!apiUrl) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="flex-1 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get in Touch"
          subtitle="Have a project in mind? Let's talk. We'll get back to you within one business day."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#00D4FF] mb-2">What to expect</h3>
              <ul className="space-y-3 text-[#B8C5D0] text-sm">
                {[
                  'A quick discovery call to understand your needs',
                  'A clear proposal with timeline and cost estimate',
                  'No jargon — plain-language communication throughout',
                  'Ongoing collaboration and transparency',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#00D4FF] mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6 text-sm text-[#B8C5D0]">
              <p className="font-medium text-[#F0F4F8] mb-1">Prefer email?</p>
              <p>
                Reach out directly at{' '}
                <a
                  href="mailto:josh.blair@gmail.com"
                  className="text-[#00D4FF] hover:underline"
                >
                  josh.blair@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Form column */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#F0F4F8] mb-1.5" htmlFor="name">
                  Name <span className="text-[#00D4FF]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="w-full rounded-md border border-[#2A3040] bg-[#1C2028] px-4 py-2.5 text-sm text-[#F0F4F8] placeholder-[#B8C5D0] focus:border-[#00D4FF] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F0F4F8] mb-1.5" htmlFor="email">
                  Email <span className="text-[#00D4FF]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full rounded-md border border-[#2A3040] bg-[#1C2028] px-4 py-2.5 text-sm text-[#F0F4F8] placeholder-[#B8C5D0] focus:border-[#00D4FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F0F4F8] mb-1.5" htmlFor="company">
                Company <span className="text-[#B8C5D0] font-normal">(optional)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full rounded-md border border-[#2A3040] bg-[#1C2028] px-4 py-2.5 text-sm text-[#F0F4F8] placeholder-[#B8C5D0] focus:border-[#00D4FF] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F0F4F8] mb-1.5" htmlFor="message">
                Message <span className="text-[#00D4FF]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project, goals, and timeline..."
                className="w-full rounded-md border border-[#2A3040] bg-[#1C2028] px-4 py-2.5 text-sm text-[#F0F4F8] placeholder-[#B8C5D0] focus:border-[#00D4FF] focus:outline-none transition-colors resize-none"
              />
            </div>

            {status === 'success' && (
              <div className="rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                Message sent! We'll be in touch within one business day.
              </div>
            )}

            {status === 'error' && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {!apiUrl
                  ? 'Contact form backend not yet configured. Please email us directly.'
                  : 'Something went wrong. Please try again or email us directly.'}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-md bg-[#00D4FF] px-6 py-3 text-sm font-semibold text-[#111318] hover:bg-[#00a8cc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
