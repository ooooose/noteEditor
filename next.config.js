/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.BUCKET_URL],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
