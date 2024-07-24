import { PutObjectCommand } from '@aws-sdk/client-s3'

import { s3Client } from './s3Client'

export async function uploadFile(
  blob: Blob,
  userId: string,
  userName: string,
  fileType: string,
): Promise<string> {
  const buffer = Buffer.from(await blob.arrayBuffer())
  const fileName = `${Date.now()}-${userId}-${userName}.${fileType}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AVATAR_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: blob.type,
      ACL: 'public-read',
    }),
  )

  return `${process.env.AVATAR_HOST_URL}/${fileName}`
}
