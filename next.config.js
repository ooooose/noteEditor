const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.CLOUDFLARE_URL,
      },
      {
        protocol: 'https',
        hostname: process.env.AVATAR_BUCKET_URL,
      },
      {
        protocol: 'https',
        hostname: process.env.GOOGLE_URL,
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
        },
      }
      config.optimization.minimize = true
    }

    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
