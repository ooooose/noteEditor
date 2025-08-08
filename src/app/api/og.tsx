import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import Image from 'next/image'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const fileName = searchParams.get('fileName')
  if (!fileName) {
    return new Response('fileName is required', { status: 400 })
  }

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

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    })
    const response = await s3Client.send(command)
    if (!response.Body) {
      return new Response('OGP fetch error: Body is undefined', { status: 500 })
    }
    const arrayBuffer = await response.Body.transformToByteArray()
    const imageData = Buffer.from(arrayBuffer)

    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
          }}
        >
          <Image
            alt='OGP'
            height={630}
            src={`data:${response.ContentType};base64,${imageData.toString('base64')}`}
            style={{ objectFit: 'cover' }}
            width={1200}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (err) {
    return new Response('OGP fetch error', { status: 500 })
  }
}
