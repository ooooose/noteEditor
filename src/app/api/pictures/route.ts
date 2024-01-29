import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// Pictures全取得API
export async function GET(req: Request, res: NextResponse) {
  try {
    await main()
    const pictures = await prisma.picture.findMany()
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
    const { image, userId, themeId } = await req.json()
    const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, S3_BUCKET_NAME } = process.env

    const s3Client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID || '',
        secretAccessKey: SECRET_ACCESS_KEY || '',
      },
    })

    const fileName = `${Date.now()}-${userId}}`
    const formData = await req.formData()
    const file: any = formData.get('image')

    // File オブジェクトから Buffer に変換
    const buffer = Buffer.from(await file?.arrayBuffer())

    const uploadParams: any = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/png',
      ACL: 'public-read',
    }
    const command = new PutObjectCommand(uploadParams)
    const uploadResult = await s3Client.send(command)
    console.log('Upload success:', uploadResult)
    const imageUrl = `https://${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`
    await main()
    const picture = await prisma.picture.create({
      data: {
        image: imageUrl,
        userId,
        themeId,
      },
    })
    return NextResponse.json({ message: 'Success', picture }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
