import { S3Client } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: process.env.REGION,
  endpoint: process.env.AVATAR_CLOUDFLARE_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY || '',
  },
})
