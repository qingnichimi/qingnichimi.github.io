import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">九局下半</h1>
      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.id} className="border-b pb-8">
            <Link href={`/posts/${encodeURIComponent(post.id)}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="text-gray-600 mt-2">{post.date}</div>
            <p className="mt-4 text-gray-700">{post.description}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
