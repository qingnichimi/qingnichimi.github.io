/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 禁用图片优化，因为 GitHub Pages 不支持
  images: {
    unoptimized: true,
  },
  // 确保资源路径正确
  assetPrefix: '/',
}

module.exports = nextConfig 