/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 如果您的仓库名是 username.github.io，则不需要 basePath
  // 如果您的仓库名是其他名称，则需要设置 basePath
  // basePath: '/YOUR_REPO_NAME',
  // 禁用图片优化，因为 GitHub Pages 不支持
  images: {
    unoptimized: true,
  },
  // 确保资源路径正确
  assetPrefix: '/',
}

module.exports = nextConfig 