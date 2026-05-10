/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

import { baseURL } from '@/lib/constants/env'

export const runtime = 'edge'

const cacheHeaders = {
  'Cache-Control': 'public, max-age=31536000, immutable',
}

function generateDefaultOGP() {
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
          background: `url(${baseURL}/background.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <h3
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 24,
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
            alt='通常OGP'
            height={260}
            src={`${baseURL}/character-front.png`}
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
    { width: 1200, height: 630, headers: cacheHeaders },
  )
}

function generateArticleOGP(targetImageUrl: string) {
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
          background: `url(${baseURL}/background.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <h3
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 24,
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
            alt='作品のOGP'
            height={260}
            src={targetImageUrl}
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
    { width: 1200, height: 630, headers: cacheHeaders },
  )
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pictureId = searchParams.get('pictureId')
  const rawImageName = searchParams.get('imageName')
  const imageName = rawImageName ? decodeURIComponent(rawImageName) : null
  const cloudflareHost = process.env.CLOUDFLARE_URL
  const apiBaseUrl = process.env.API_BASE_URL

  try {
    if (pictureId && apiBaseUrl) {
      const res = await fetch(`${apiBaseUrl}/api/v1/pictures/${pictureId}`)
      if (res.ok) {
        const { data } = await res.json()
        const ogpImageUrl = data?.attributes?.ogp_image_url
        if (ogpImageUrl) {
          // スタイリング済み画像なのでそのままimgとして返す
          return new ImageResponse(
            (
              <img
                alt='作品のOGP'
                height={630}
                src={ogpImageUrl}
                style={{ objectFit: 'cover' }}
                width={1200}
              />
            ),
            { width: 1200, height: 630, headers: cacheHeaders },
          )
        }
      }
    }

    if (imageName && cloudflareHost) {
      const targetImageUrl = `https://${cloudflareHost}/${encodeURIComponent(imageName)}`
      const imageRes = await fetch(targetImageUrl)
      if (imageRes.ok) {
        return generateArticleOGP(targetImageUrl)
      }
    }

    return generateDefaultOGP()
  } catch (err) {
    console.error('OG generation error:', err)
    return generateDefaultOGP()
  }
}
