import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { testimonials } from '../data/testimonials'
import { articles } from '../data/articles'

const techTags = ['AWS', 'Serverless', '.NET / C#', 'Node.js', 'Python', 'TypeScript', 'Angular', 'Agentic AI']

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured)
  const latestArticles = articles.slice(0, 2)
  const teaserTestimonials = testimonials.slice(0, 2)

  return (
    <div>
      <section className="bg-gradient-to-b from-[#1C2028] to-[#111318] min-h-[calc(100vh-4rem)] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <img
            src="/josh-blair.jpg"
            alt="Josh Blair"
            className="w-28 h-28 rounded-full object-cover object-top border-2 border-[#00D4FF]/30 mx-auto mb-8"
          />
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F0F4F8] mb-4 tracking-tight">
            Josh Blair
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-[#00D4FF] mb-6">
            AWS Cloud Architect · Full-Stack Engineer · Agentic AI
          </p>
          <p className="text-lg text-[#CBD5E1] max-w-2xl mx-auto mb-10">
            30+ years building dependable systems. Focused on serverless AWS architecture, event-driven design, and AI-powered solutions using Claude and Bedrock.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/portfolio"
              className="bg-[#00D4FF] text-[#111318] font-semibold px-6 py-3 rounded-lg hover:bg-[#00B8E0] transition-colors"
            >
              View Portfolio
            </Link>
            <Link
              to="/contact"
              className="border border-[#00D4FF] text-[#00D4FF] px-6 py-3 rounded-lg hover:bg-[#00D4FF]/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#2A3040] bg-[#232936] px-3 py-1 text-xs text-[#CBD5E1]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8]">Featured Projects</h2>
            <Link to="/portfolio" className="text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.name}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6 flex flex-col gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#F0F4F8] mb-2">{project.name}</h3>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#2A3040] bg-[#232936] px-3 py-1 text-xs text-[#CBD5E1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors"
                >
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1C2028]/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8]">What People Say</h2>
            <Link to="/testimonials" className="text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teaserTestimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-8 flex flex-col gap-4"
              >
                <p className="text-[#00D4FF] text-4xl font-serif leading-none">"</p>
                <p className="text-[#CBD5E1] leading-relaxed italic">"{t.text}"</p>
                <div className="mt-auto pt-4 border-t border-[#2A3040]">
                  <p className="font-semibold text-[#F0F4F8] text-sm">{t.name}</p>
                  <p className="text-xs text-[#B8C5D0] mt-1">{t.title}</p>
                  <p className="text-xs text-[#B8C5D0]">{t.relationship}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8]">Latest Articles</h2>
            <Link to="/articles" className="text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors">
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {latestArticles.map((article) => (
              <div
                key={article.slug}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-6 flex flex-col gap-3"
              >
                <p className="text-xs text-[#B8C5D0]">{formatDate(article.date)}</p>
                <h3 className="text-xl font-semibold text-[#F0F4F8]">{article.title}</h3>
                <p className="text-sm text-[#CBD5E1] leading-relaxed">{article.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#2A3040] bg-[#232936] px-3 py-1 text-xs text-[#CBD5E1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1C2028]/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] mb-4">
            Ready to work together?
          </h2>
          <p className="text-[#CBD5E1] mb-8 text-lg">
            Whether you need cloud architecture, a backend system, or AI integration — let's talk.
          </p>
          <Link
            to="/contact"
            className="bg-[#00D4FF] text-[#111318] font-semibold px-8 py-3 rounded-lg hover:bg-[#00B8E0] transition-colors inline-block"
          >
            Let's Talk
          </Link>
        </div>
      </section>
    </div>
  )
}
