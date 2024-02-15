const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.BUCKET_URL],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
