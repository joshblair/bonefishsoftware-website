import { articles } from '../data/articles'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Articles() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] mb-4">Articles</h1>
          <p className="text-[#CBD5E1] max-w-2xl leading-relaxed">
            I write about cloud architecture, AI, and software engineering. Articles are cross-posted to Dev.to, Medium, and LinkedIn.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {articles.map((article) => {
            const hasExternalLinks = article.devToUrl || article.mediumUrl || article.linkedinUrl

            return (
              <div
                key={article.slug}
                className="rounded-xl border border-[#2A3040] bg-[#1C2028] p-8 flex flex-col gap-4"
              >
                <div>
                  <p className="text-xs text-[#B8C5D0] mb-2">{formatDate(article.date)}</p>
                  <h2 className="text-2xl font-semibold text-[#F0F4F8] mb-3">{article.title}</h2>
                  <p className="text-[#CBD5E1] leading-relaxed">{article.summary}</p>
                </div>

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

                {hasExternalLinks ? (
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#2A3040]">
                    <span className="text-xs text-[#B8C5D0]">Read on:</span>
                    {article.devToUrl && (
                      <a
                        href={article.devToUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors"
                      >
                        Dev.to
                      </a>
                    )}
                    {article.mediumUrl && (
                      <a
                        href={article.mediumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors"
                      >
                        Medium
                      </a>
                    )}
                    {article.linkedinUrl && (
                      <a
                        href={article.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="pt-2 border-t border-[#2A3040]">
                    <p className="text-xs text-[#B8C5D0] italic">Full article coming soon</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
