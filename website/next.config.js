/** @type {import('next').NextConfig} */
const repoName = 'volleyball_analysis_webapp'
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
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },
}

module.exports = nextConfig

