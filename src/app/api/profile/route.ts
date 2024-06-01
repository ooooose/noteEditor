import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse, NextRequest } from 'next/server'

import { prisma, main } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const image = formData.get('image') as File | null

  const {
    CLOUDFLARE_ACCESS_KEY_ID,
    AVATAR_CLOUDFLARE_ENDPOINT,
    CLOUDFLARE_ACCESS_KEY,
    REGION,
    AVATAR_BUCKET_NAME,
  } = process.env

  try {
    await main()
    if (image && image instanceof File) {
      const s3Client = new S3Client({
        region: REGION,
        endpoint: AVATAR_CLOUDFLARE_ENDPOINT as string,
        credentials: {
          accessKeyId: CLOUDFLARE_ACCESS_KEY_ID || '',
          secretAccessKey: CLOUDFLARE_ACCESS_KEY || '',
        },
      })

      const fileName = `${Date.now()}-${id}-${name}`
      const buffer = Buffer.from(await image.arrayBuffer())

      const uploadImage: any = {
        Bucket: AVATAR_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: image.type,
        ACL: 'public-read',
      }

      const command = new PutObjectCommand(uploadImage)
      await s3Client.send(command)
      const imageUrl = `${process.env.AVATAR_HOST_URL}/${fileName}`

      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          image: imageUrl,
        },
      })
      return NextResponse.json({ message: 'Success', user }, { status: 200 })
    } else {
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      })
      return NextResponse.json({ message: 'Success', user }, { status: 200 })
    }
  } catch (err) {
    console.error('POST Error:', err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
