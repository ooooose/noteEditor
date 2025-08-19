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
            background: 'linear-gradient(180deg, #f8f5ef 0%, #f3ede4 100%)',
            position: 'relative',
          }}
        >
          <h3
            style={{
              fontSize: 56,
              fontWeight: 'bold',
              marginBottom: 48,
              display: 'flex',
              gap: 2,
              textShadow: '0 2px 6px rgba(0,0,0,0.15)',
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
              padding: 24,
              background: '#fff5e5',
              border: '20px solid #3B1F0F',
              boxShadow:
                'inset 0 0 12px rgba(0,0,0,0.15), 0 12px 36px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              minWidth: 500,
              minHeight: 340,
              borderRadius: 4,
            }}
          >
            <img
              alt={alt}
              height={260}
              src={imageUrl}
              style={{
                objectFit: 'contain',
                boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                background: '#fff',
                display: 'block',
                borderRadius: 2,
              }}
              width={420}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              width: '50%',
              height: '40px',
              background: 'rgba(0,0,0,0.08)',
              filter: 'blur(20px)',
              borderRadius: '50%',
            }}
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
