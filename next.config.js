/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.BUCKET_URL],
  },
}

module.exports = nextConfig
