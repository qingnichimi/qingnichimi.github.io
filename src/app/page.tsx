import { getAllPosts } from '@/lib/posts'
import Image from 'next/image'
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
    <main className="py-10">
      <div className="max-w-2xl mx-auto px-6">
        <header className="text-center mb-12">
          <Image
            src="/avatar.png"
            alt="avatar"
            width={120}
            height={120}
            className="rounded-full object-cover mx-auto"
          />
          <h1 className="text-2xl font-bold mt-4">九局下半</h1>
        </header>

        <div className="space-y-14">
          {sortedYears.map(year => (
            <section key={year}>
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-wide uppercase mb-6 pb-2 border-b border-gray-200 dark:border-zinc-700">
                {year}
              </h2>

              <div className="space-y-5">
                {postsByYear[year].map(post => (
                  <article
                    key={post.id}
                    className="border-l-2 border-gray-200 dark:border-zinc-700 pl-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                  >
                    <Link href={`/posts/${post.id}/`}>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">
                      {post.date}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
