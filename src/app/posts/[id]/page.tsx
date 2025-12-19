import { getAllPostIds, getPostData } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const fileNames = getAllPostIds()
  return fileNames.map(fileName => ({
    id: fileName.id,
  }))
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function Post({ params }: Props) {
  const { id } = await params

  try {
    const post = await getPostData(id)

    return (
      <main className="min-h-screen p-8 bg-white dark:bg-zinc-900">
        <div className="max-w-2xl mx-auto">
          {/* <Link
            href="/"
            className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 mb-12"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200 mr-1">←</span>
            Back to Home
          </Link> */}

          <article>
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <time className="text-gray-500 dark:text-gray-400 font-medium">
                {post.date}
              </time>
            </header>

            <div
              className="prose prose-lg prose-slate dark:prose-invert mx-auto max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
          </article>
        </div>
      </main>
    )
  } catch {
    notFound()
  }
}
