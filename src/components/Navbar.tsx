import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/technologies', label: 'Technologies' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-[#00D4FF]' : 'text-[#CBD5E1] hover:text-[#F0F4F8]'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A3040] bg-[#1C2028]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img src="/logo.svg" alt="Bonefish Software" className="h-10 w-auto drop-shadow-[0_0_8px_rgba(0,212,255,0.25)]" />
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <NavLink
              to="/contact"
              className="rounded-md bg-[#00D4FF] px-4 py-2 text-sm font-semibold text-[#111318] transition-colors hover:bg-[#00a8cc]"
            >
              Get in Touch
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#CBD5E1] hover:text-[#F0F4F8] p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[#2A3040] py-4 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-md bg-[#00D4FF] px-4 py-2 text-center text-sm font-semibold text-[#111318]"
            >
              Get in Touch
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
