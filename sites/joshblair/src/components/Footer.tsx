export default function Footer() {
  return (
    <footer className="border-t border-[#2A3040] bg-[#111318]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#B8C5D0]">© 2025 Josh Blair</p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/joshblair"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#B8C5D0] hover:text-[#00D4FF] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/joshblair/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#B8C5D0] hover:text-[#00D4FF] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://bonefishsoftware.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#B8C5D0] hover:text-[#00D4FF] transition-colors"
            >
              Bonefish Software
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
