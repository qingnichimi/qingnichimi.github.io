import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  id: string
  title: string
  date: string
  description: string
  contentHtml?: string
}

// 获取所有文章 ID（编码用于 URL）
export function getAllPostIds() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => ({
      id: encodeURIComponent(fileName.replace(/\.md$/, ''))
    }))
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
}

// 获取指定文章内容（解码用于文件名）
export async function getPostData(id: string): Promise<Post> {
  const decodedId = decodeURIComponent(id)
  const fullPath = path.join(postsDirectory, `${decodedId}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; description: string })
  }
}

// 获取所有文章数据（用于首页展示，可保持原样或也加编码）
export function getAllPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
      const id = encodeURIComponent(fileName.replace(/\.md$/, '')) // 也建议编码
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        id,
        ...(matterResult.data as { title: string; date: string; description: string })
      }
    })

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}
