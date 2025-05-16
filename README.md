# 极简风格静态博客

这是一个使用 Next.js 构建的极简风格静态博客，支持 Markdown 格式的文章。

## 特点

- 使用 Markdown 编写文章
- 极简设计
- 响应式布局
- 支持代码高亮
- 可部署到 GitHub Pages

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- Markdown

## 本地开发

1. 克隆仓库
```bash
git clone <your-repo-url>
cd blog
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 在浏览器中访问 http://localhost:3000

## 添加新文章

1. 在 `content/posts` 目录下创建新的 `.md` 文件
2. 在文件开头添加 frontmatter：
```markdown
---
title: '文章标题'
date: 'YYYY-MM-DD'
description: '文章描述'
---
```
3. 使用 Markdown 语法编写文章内容

## 部署到 GitHub Pages

1. 在 `next.config.js` 中添加以下配置：
```js
const nextConfig = {
  output: 'export',
  basePath: '/<your-repo-name>',
}
```

2. 构建项目
```bash
npm run build
```

3. 将 `out` 目录的内容推送到 GitHub 仓库的 `gh-pages` 分支

4. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支作为源

## 许可证

MIT
