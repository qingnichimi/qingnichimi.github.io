import { getAllPostIds, getPostData } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const fileNames = getAllPostIds()
  // 确保返回的对象包含 id 属性，并且 id 是字符串
  return fileNames.map(fileName => ({
    id: encodeURIComponent(fileName.id), // 确保 ID 是字符串并进行编码
  }))
}

type Props = {
  params: { id: string }
}

export default async function Post({ params }: Props) {
  const { id } = await params // 等待 params 解析

  try {
    const post = await getPostData(decodeURIComponent(id)) // 解码，防止文件名不匹配

    return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← 返回首页
        </Link>
        <article className="mt-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-8">{post.date}</div>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} 
          />
        </article>
      </main>
    )
  } catch {
    notFound()
  }
}
