import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const apiUrl = import.meta.env.VITE_CONTACT_API_URL as string
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (!res.ok) throw new Error('Request failed')

      setFormState('success')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch {
      setFormState('error')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-[#2A3040] bg-[#232936] px-4 py-3 text-sm text-[#F0F4F8] placeholder-[#B8C5D0] focus:border-[#00D4FF] focus:outline-none focus:ring-1 focus:ring-[#00D4FF] transition-colors'

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] mb-4">Get in Touch</h1>
          <p className="text-[#CBD5E1] max-w-2xl leading-relaxed">
            Whether you have a project in mind, want to talk cloud architecture, or just want to connect — I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {formState === 'success' ? (
              <div className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/40 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[#F0F4F8] mb-2">Message sent!</h2>
                <p className="text-[#CBD5E1]">I'll get back to you soon.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-6 text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-[#B8C5D0] uppercase tracking-wider">
                      Name <span className="text-[#00D4FF]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-[#B8C5D0] uppercase tracking-wider">
                      Email <span className="text-[#00D4FF]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-medium text-[#B8C5D0] uppercase tracking-wider">
                    Subject <span className="text-[#00D4FF]">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-[#B8C5D0] uppercase tracking-wider">
                    Message <span className="text-[#00D4FF]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project or question..."
                    className={inputClass + ' resize-none'}
                  />
                </div>

                {formState === 'error' && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    Something went wrong. Please try again or email me directly at{' '}
                    <a href="mailto:josh.blair@gmail.com" className="underline hover:text-red-300">
                      josh.blair@gmail.com
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="bg-[#00D4FF] text-[#111318] font-semibold px-6 py-3 rounded-lg hover:bg-[#00B8E0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6">
              <h2 className="text-lg font-semibold text-[#F0F4F8] mb-5">Direct Contact</h2>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:josh.blair@gmail.com"
                  className="flex items-center gap-3 text-sm text-[#CBD5E1] hover:text-[#00D4FF] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg border border-[#2A3040] bg-[#232936] flex items-center justify-center flex-shrink-0 group-hover:border-[#00D4FF]/40 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>josh.blair@gmail.com</span>
                </a>

                <a
                  href="https://linkedin.com/in/joshblair/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#CBD5E1] hover:text-[#00D4FF] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg border border-[#2A3040] bg-[#232936] flex items-center justify-center flex-shrink-0 group-hover:border-[#00D4FF]/40 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <span>linkedin.com/in/joshblair</span>
                </a>

                <a
                  href="https://github.com/joshblair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#CBD5E1] hover:text-[#00D4FF] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg border border-[#2A3040] bg-[#232936] flex items-center justify-center flex-shrink-0 group-hover:border-[#00D4FF]/40 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <span>github.com/joshblair</span>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6">
              <h2 className="text-lg font-semibold text-[#F0F4F8] mb-3">Response Time</h2>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                I typically respond within 1–2 business days. For urgent matters, reach out directly on LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
