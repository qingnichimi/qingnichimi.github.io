import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  id: string
  title: string
  date: string
  description: string
  contentHtml?: string
}

// 获取所有文章 ID
export function getAllPostIds() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => ({
      id: fileName.replace(/\.md$/, '')
    }))
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
}

// 获取指定文章内容
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  if (!fs.existsSync(fullPath)) throw new Error('Post not found');

  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { content, data } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)       // 支持表格、任务列表、表情
    .use(remarkRehype)    // Markdown → HTML AST
    .use(rehypeHighlight) // 代码块高亮
    .use(rehypeStringify) // 输出 HTML
    .process(content);

  return {
    id,
    contentHtml: processedContent.toString(),
    ...(data as { title: string; date: string })
  };
}

// 获取所有文章数据
export function getAllPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '')
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
