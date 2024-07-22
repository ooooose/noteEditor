import { PutObjectCommand } from '@aws-sdk/client-s3'

import { s3Client } from './s3Client'

export async function uploadFile(file: Blob, userId: string, userName: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `${Date.now()}-${userId}-${userName}.${file.type.split('/')[1]}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AVATAR_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read',
    }),
  )

  return `${process.env.AVATAR_HOST_URL}/${fileName}`
}
