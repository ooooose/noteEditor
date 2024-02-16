import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

// Pictures全取得API
export async function GET(req: Request, res: NextResponse) {
  try {
    await main()
    const pictures = await prisma.picture.findMany({
      include: {
        theme: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ message: 'Success', pictures }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// Picture作成API
export async function POST(req: Request, res: NextResponse) {
  try {
    const { image, email, themeId } = await req.json()
    const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, S3_BUCKET_NAME } = process.env

    const s3Client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID || '',
        secretAccessKey: SECRET_ACCESS_KEY || '',
      },
    })
    const blob = atob(image.replace(/^.*,/, ''))
    let buff = new Uint8Array(blob.length)
    for (let i = 0; i < blob.length; i++) {
      buff[i] = blob.charCodeAt(i)
    }

    const file = new File([buff.buffer], `${Date.now()}-${themeId}}`, { type: 'image/png' })
    const fileName = `${Date.now()}-${themeId}`

    // File オブジェクトから Buffer に変換
    const buffer = Buffer.from(await file?.arrayBuffer())

    const uploadParams: any = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/webp',
      ACL: 'public-read',
    }
    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)
    const imageUrl = `https://${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`
    await main()
    const user = await prisma.user.findFirst({
      where: { email: email },
    })
    const picture = await prisma.picture.create({
      data: {
        image: imageUrl,
        author: user.name,
        userId: user.id,
        themeId: themeId,
      },
    })
    return NextResponse.json({ message: 'Success', picture }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(req: Request, res: NextResponse) {
  try {
    const { id, image } = await req.json()
    const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, S3_BUCKET_NAME } = process.env

    const s3Client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID || '',
        secretAccessKey: SECRET_ACCESS_KEY || '',
      },
    })
    const key: string = image.split(`${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/`)[1]
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
      }),
    )
    await main()
    const picture = await prisma.picture.delete({
      where: { id: id },
    })
    return NextResponse.json({ message: 'Success', picture }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
