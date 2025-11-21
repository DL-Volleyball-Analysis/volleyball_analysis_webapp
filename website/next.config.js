/** @type {import('next').NextConfig} */
const repoName = 'volleyball-analysis'
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  images: {
    domains: [],
    unoptimized: true,
  },
  trailingSlash: true,
  // 只在 GitHub Pages (production) 套用子路徑，localhost 仍走根路徑
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
}

module.exports = nextConfig

