import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPosts()
  
  // 按年份对文章进行分组
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof posts>)

  // 将年份按降序排序
  const sortedYears = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          {/* 左侧留白 */}
          <div className="col-span-2"></div>
          
          {/* 主要内容区域 */}
          <div className="col-span-8">
            <header className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">九局下半</h1>
            </header>
            <div className="space-y-20">
              {sortedYears.map(year => (
                <section key={year} className="space-y-8">
                  <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                    {year} 年
                  </h2>
                  <div className="space-y-10">
                    {postsByYear[Number(year)].map(post => (
                      <article key={post.id} className="pb-8">
                        <div className="flex items-center gap-4">
                          <Link href={`/posts/${post.id}/`} className="flex-1">
                            <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-4 text-sm text-gray-500 whitespace-nowrap">
                            <span>{post.date}</span>
                            <span className="text-gray-300">·</span>
                            <span className="text-gray-600">{post.description}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* 右侧留白 */}
          <div className="col-span-2"></div>
        </div>
      </div>
    </main>
  )
}
