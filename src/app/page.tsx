import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPosts()

  // 按年份分组
  const postsByYear = posts.reduce((acc, post) => {
    const year = Number(post.date.substring(0, 4))
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof posts>)

  const sortedYears = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">

          <div className="col-span-2" />

          <div className="col-span-8">
            <header className="text-center mb-16">
              <div className="mx-auto">
                <img
                  src="/avatar.png"
                  alt="avatar"
                  width={200}
                  height={200}
                  className="rounded-full object-cover mx-auto shadow-md border"
                />
              </div>
              <h1 className="text-4xl font-bold mt-6">九局下半</h1>
            </header>

            <div className="space-y-20">
              {sortedYears.map(year => (
                <section key={year} className="space-y-8">

                  <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                    {year} 年
                  </h2>

                  <div className="space-y-10">
                    {postsByYear[year].map(post => (
                      <article
                        key={post.id}
                        className="pb-8"
                      >
                        {/* 标题 + 时间 + 描述 */}
                        <Link href={`/posts/${post.id}/`}>
                          <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                        </Link>

                        <div className="mt-2 text-sm text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>{post.date}</span>
                          <span className="text-gray-300">·</span>
                          <span>{post.description}</span>
                        </div>

                      </article>
                    ))}
                  </div>

                </section>
              ))}
            </div>
          </div>

          <div className="col-span-2" />

        </div>
      </div>
    </main>
  )
}
