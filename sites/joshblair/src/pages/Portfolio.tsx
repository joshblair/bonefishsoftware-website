import { useState } from 'react'
import { projects } from '../data/projects'

function getAllTags() {
  const tagSet = new Set<string>()
  projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet)
}

export default function Portfolio() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const allTags = getAllTags()

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] mb-4">Portfolio</h1>
          <p className="text-[#CBD5E1] max-w-2xl">
            A selection of projects spanning cloud architecture, serverless systems, and AI-powered applications.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTag === null
                ? 'bg-[#00D4FF] text-[#111318]'
                : 'border border-[#2A3040] bg-[#232936] text-[#CBD5E1] hover:border-[#00D4FF] hover:text-[#00D4FF]'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-[#00D4FF] text-[#111318]'
                  : 'border border-[#2A3040] bg-[#232936] text-[#CBD5E1] hover:border-[#00D4FF] hover:text-[#00D4FF]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <div
              key={project.name}
              className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6 flex flex-col gap-4"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#F0F4F8] mb-3">{project.name}</h2>
                <p className="text-sm text-[#CBD5E1] leading-relaxed">{project.longDescription}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      activeTag === tag
                        ? 'border-[#00D4FF] bg-[#00D4FF]/10 text-[#00D4FF]'
                        : 'border-[#2A3040] bg-[#232936] text-[#CBD5E1] hover:border-[#00D4FF]/50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-auto pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#2A3040] text-[#CBD5E1] px-4 py-2 rounded-lg text-sm hover:border-[#00D4FF] hover:text-[#00D4FF] transition-colors"
                >
                  GitHub
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00D4FF] text-[#111318] font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#00B8E0] transition-colors"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
