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
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">出错了</h1>
      <p className="mb-4">抱歉，加载页面时发生错误。</p>
      {error.message && (
        <p className="mb-4 text-sm text-gray-600">
          错误信息: {error.message}
        </p>
      )}
      <div className="space-x-4">
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