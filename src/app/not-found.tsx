import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">404 - 页面未找到</h1>
      <p className="mb-4">抱歉，您请求的页面不存在。</p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← 返回首页
      </Link>
    </main>
  )
} 