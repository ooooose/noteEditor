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
            background: '#fff',
          }}
        >
          <h3
            style={{
              fontSize: 56,
              fontWeight: 'bold',
              marginBottom: 32,
              display: 'flex',
              gap: 4,
            }}
          >
            <span style={{ color: '#ef4444' }}>画</span>
            <span style={{ color: '#111827' }}>H</span>
            <span style={{ color: '#f59e42' }}>A</span>
            <span style={{ color: '#22c55e' }}>C</span>
            <span style={{ color: '#3b82f6' }}>K</span>
          </h3>
          <div
            style={{
              position: 'relative',
              padding: 32,
              background: '#fff5e5',
              border: '16px solid #3B1F0F',
              boxShadow:
                'inset 0 0 8px hsla(0,0%,0%,0.18), 0 8px 24px 0 hsla(0,0%,0%,0.18), 0 2px 8px 0 hsla(0,0%,0%,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              minWidth: 600,
              minHeight: 400,
            }}
          >
            <img
              alt={alt}
              height={300}
              src={imageUrl}
              style={{
                objectFit: 'contain',
                boxShadow: '0 4px 16px 0 rgba(0,0,0,0.13)',
                background: '#fff',
                display: 'block',
              }}
              width={500}
            />
          </div>
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
