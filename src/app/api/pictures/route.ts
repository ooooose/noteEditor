import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

import { prisma, main } from '@/lib/prisma'

// Pictures全取得API
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  let theme = (searchParams.get('theme') as string) || undefined
  try {
    await main()
    // TODO: 暫定処理。なぜか最後に'?'がついてしまう
    if (theme) {
      theme = theme.replace(/\?$/, '')
    }
    const pictures = await prisma.picture.findMany({
      include: {
        theme: true,
      },
      where: {
        theme: {
          title: theme,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ pictures }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// Picture作成API
export async function POST(req: Request) {
  try {
    const { image, userId, userName, themeId } = await req.json()
    const {
      CLOUDFLARE_ACCESS_KEY_ID,
      CLOUDFLARE_ENDPOINT,
      CLOUDFLARE_ACCESS_KEY,
      REGION,
      BUCKET_NAME,
    } = process.env

    const s3Client = new S3Client({
      region: REGION,
      endpoint: CLOUDFLARE_ENDPOINT as string,
      credentials: {
        accessKeyId: CLOUDFLARE_ACCESS_KEY_ID || '',
        secretAccessKey: CLOUDFLARE_ACCESS_KEY || '',
      },
    })
    const blob = atob(image.replace(/^.*,/, ''))
    let buff = new Uint8Array(blob.length)
    for (let i = 0; i < blob.length; i++) {
      buff[i] = blob.charCodeAt(i)
    }

    const file = new File([buff.buffer], `${Date.now()}-${themeId}}`, { type: 'image/webp' })
    const fileName = `${Date.now()}-${themeId}`

    // File オブジェクトから Buffer に変換
    const buffer = Buffer.from(await file?.arrayBuffer())

    const uploadParams: any = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/webp',
      ACL: 'public-read',
    }
    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)
    const imageUrl = `${process.env.IMAGE_HOST_URL}/${fileName}`

    await main()
    const picture = await prisma.picture.create({
      data: {
        image: imageUrl,
        author: userName,
        userId: userId,
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

export async function PUT(req: Request) {
  try {
    const { id, frameId } = await req.json()
    await main()
    const picture = await prisma.picture.update({
      where: { id: id },
      data: { frameId: frameId },
    })
    return NextResponse.json({ message: 'Success', picture }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    // const { CLOUDFLARE_ACCESS_KEY_ID, CLOUDFLARE_ACCESS_KEY, REGION, BUCKET_NAME } = process.env

    // const s3Client = new S3Client({
    //   region: REGION,
    //   credentials: {
    //     accessKeyId: CLOUDFLARE_ACCESS_KEY_ID || '',
    //     secretAccessKey: CLOUDFLARE_ACCESS_KEY || '',
    //   },
    // })
    // const key: string = image.split(`${process.env.IMAGE_HOST_URL}/`)[1]
    // await s3Client.send(
    //   new DeleteObjectCommand({
    //     Bucket: BUCKET_NAME,
    //     Key: key,
    //   }),
    // )
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

// export const runtime = 'edge'
