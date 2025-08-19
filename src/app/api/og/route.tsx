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

    const imageUrl = data.data.attributes.image_url
    const alt = 'OGP'

    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3 style={{ fontSize: 48, marginBottom: 32 }}>画HACK</h3>
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
