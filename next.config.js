const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.BUCKET_URL,
      },
      {
        protocol: 'https',
        hostname: process.env.GOOGLE_URL,
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
