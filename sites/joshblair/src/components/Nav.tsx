import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Resume', to: '/resume' },
  { label: 'Articles', to: '/articles' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (to: string) => location.pathname === to

  return (
    <nav className="sticky top-0 z-50 bg-[#111318]/95 backdrop-blur-sm border-b border-[#2A3040]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-[#F0F4F8] font-semibold text-lg hover:text-[#00D4FF] transition-colors"
          >
            Josh Blair
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  isActive(link.to)
                    ? 'text-[#00D4FF]'
                    : 'text-[#CBD5E1] hover:text-[#00D4FF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://bonefishsoftware.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#B8C5D0] hover:text-[#CBD5E1] transition-colors ml-2"
            >
              Bonefish Software
            </a>
          </div>

          <button
            className="md:hidden text-[#CBD5E1] hover:text-[#00D4FF] transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#2A3040] py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-2 text-sm rounded transition-colors ${
                  isActive(link.to)
                    ? 'text-[#00D4FF]'
                    : 'text-[#CBD5E1] hover:text-[#00D4FF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://bonefishsoftware.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2 text-xs text-[#B8C5D0] hover:text-[#CBD5E1] transition-colors"
            >
              Bonefish Software
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
