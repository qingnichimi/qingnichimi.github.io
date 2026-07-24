'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="py-10 max-w-xl mx-auto px-6">
      <h1 className="text-2xl font-bold mb-4">出错了</h1>
      <p className="mb-4 text-sm text-gray-500">
        {error.message || '加载页面时发生错误'}
      </p>
      <div className="space-x-4 text-sm">
        <button
          onClick={reset}
          className="text-blue-600 hover:underline"
        >
          重试
        </button>
        <Link href="/" className="text-blue-600 hover:underline">
          ← 返回首页
        </Link>
      </div>
    </main>
  )
}