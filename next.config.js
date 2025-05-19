/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 禁用图片优化，因为 GitHub Pages 不支持
  images: {
    unoptimized: true,
  },
  // 确保资源路径正确
  assetPrefix: '/',
  // 确保所有路由都正确处理
  trailingSlash: true
}

module.exports = nextConfig 