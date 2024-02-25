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
