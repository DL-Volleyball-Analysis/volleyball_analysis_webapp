/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: [],
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Pages 部署在子路徑 /volleyball-analysis/
  basePath: '/volleyball-analysis',
  assetPrefix: '/volleyball-analysis',
}

module.exports = nextConfig

