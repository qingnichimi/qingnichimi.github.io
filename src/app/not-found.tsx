import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="py-10 max-w-xl mx-auto px-6">
      <h1 className="text-2xl font-bold mb-4">404</h1>
      <p className="mb-6 text-gray-500">页面未找到</p>
      <Link href="/" className="text-blue-600 hover:underline text-sm">
        ← 返回首页
      </Link>
    </main>
  )
}