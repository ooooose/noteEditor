import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

// R2：画像アップロードAPI
export async function POST(req: Request) {
  try {
    const { image, fileName } = await req.json()
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

    const buffer = Buffer.from(image.replace(/^.*,/, ''), 'base64')

    const uploadParams: any = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/png',
      ACL: 'public-read',
    }
    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)

    return NextResponse.json({ message: 'Uploaded successfully' }, { status: 201 })
  } catch (err) {
    console.error('Upload Error:', err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  }
}

// export async function DELETE(req: Request) {
//   try {
//     const { id } = await req.json()
//     // TODO: 現状オブジェクトの削除ができなそうなので、一旦据え置き（今後は削除したらオブジェクトも削除したい）
//     // const { CLOUDFLARE_ACCESS_KEY_ID, CLOUDFLARE_ACCESS_KEY, REGION, BUCKET_NAME } = process.env

//     // const s3Client = new S3Client({
//     //   region: REGION,
//     //   credentials: {
//     //     accessKeyId: CLOUDFLARE_ACCESS_KEY_ID || '',
//     //     secretAccessKey: CLOUDFLARE_ACCESS_KEY || '',
//     //   },
//     // })
//     // const key: string = image.split(`${process.env.IMAGE_HOST_URL}/`)[1]
//     // await s3Client.send(
//     //   new DeleteObjectCommand({
//     //     Bucket: BUCKET_NAME,
//     //     Key: key,
//     //   }),
//     // )
//     await main()
//     const picture = await prisma.picture.delete({
//       where: { id: id },
//     })
//     return NextResponse.json({ message: 'Success', picture }, { status: 200 })
//   } catch (err) {
//     return NextResponse.json({ message: 'Error', err }, { status: 500 })
//   } finally {
//     await prisma.$disconnect()
//   }
// }
