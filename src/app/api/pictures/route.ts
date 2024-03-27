import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

import { prisma, main } from '@/lib/prisma'

// Pictures全取得API
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  let theme = (searchParams.get('theme') as string) ?? undefined
  const pageIndex = searchParams.get('page') || '1'
  const take = 6
  try {
    await main()
    let whereClause = {}
    if (theme) {
      whereClause = {
        theme: {
          title: theme,
        },
      }
    }
    const skip = (parseInt(pageIndex, 10) - 1) * take

    const pictures = await prisma.picture.findMany({
      include: {
        theme: true,
        likes: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
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
    const { image, userId, userName, title } = await req.json()
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

    const file = new File([buff.buffer], `${Date.now()}-${title}}`, { type: 'image/webp' })
    const fileName = `${Date.now()}-${title}`

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
    let theme = await prisma.theme.findUnique({
      where: {
        title: title,
      },
    })
    if (!theme) {
      theme = await prisma.theme.create({
        data: {
          title: title,
          userId: userId,
        },
      })
    }
    const picture = await prisma.picture.create({
      data: {
        image: imageUrl,
        author: userName,
        userId: userId,
        themeId: theme.id,
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
    // TODO: 現状オブジェクトの削除ができなそうなので、一旦据え置き（今後は削除したらオブジェクトも削除したい）
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
