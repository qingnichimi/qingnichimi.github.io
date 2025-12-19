import { getAllPostIds, getPostData } from '@/lib/posts'
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
