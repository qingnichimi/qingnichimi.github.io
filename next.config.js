/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 替换为您的仓库名
  basePath: '/YOUR_REPO_NAME',
  // 禁用图片优化，因为 GitHub Pages 不支持
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 