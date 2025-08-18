/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? ''
  const { searchParams } = new URL(req.url)
  const pictureId = searchParams.get('pictureId')
  if (!pictureId) {
    return new Response('pictureId is required', { status: 400 })
  }

  try {
    const res = await fetch(`${baseURL}/api/v1/pictures/${pictureId}`, {
      headers: { Accept: 'application/json' },
    })
    const data = await res.json()

    // 画像URLとaltの取得
    const imageUrl = data.data.attributes.image_url
    // テーマタイトルが必要なら、別途APIで取得する必要があります（idしかない場合は空文字でOK）
    const alt = 'OGP'

    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img alt={alt} height={400} src={imageUrl} style={{ objectFit: 'contain' }} width={600} />
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
