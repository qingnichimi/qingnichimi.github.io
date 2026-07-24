import { getAllPostIds, getPostData } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

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
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-6">

          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {post.title}
              </h1>
              <time className="block mt-2 text-sm text-gray-500 dark:text-gray-400">
                {post.date}
              </time>
            </header>

            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none
                prose-headings:font-bold
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-img:max-h-96 prose-img:w-auto prose-img:mx-auto prose-img:rounded-lg"
            >
              <MDXRemote
                source={post.content || ''}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeHighlight]
                  }
                }}
              />
            </div>
          </article>

          <footer className="mt-12 pt-6 border-t text-sm text-gray-400">
            <Link href="/">← 返回首页</Link>
          </footer>
        </div>
      </main>
    )
  } catch {
    notFound()
  }
}
