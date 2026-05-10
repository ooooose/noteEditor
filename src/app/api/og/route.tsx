export const runtime = 'edge'

const cacheHeaders = {
  'Cache-Control': 'public, max-age=31536000, immutable',
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const rawImageName = searchParams.get('imageName')
  const imageName = rawImageName ? decodeURIComponent(rawImageName) : null
  const cloudflareHost = process.env.CLOUDFLARE_URL

  try {
    if (cloudflareHost) {
      if (imageName) {
        const ogpImageUrl = `https://${cloudflareHost}/ogp/${imageName}`
        const ogpRes = await fetch(ogpImageUrl)
        if (ogpRes.ok) {
          return new Response(ogpRes.body, {
            headers: { ...cacheHeaders, 'Content-Type': 'image/png' },
          })
        }

        const targetImageUrl = `https://${cloudflareHost}/${encodeURIComponent(imageName)}`
        const imageRes = await fetch(targetImageUrl)
        if (imageRes.ok) {
          return new Response(imageRes.body, {
            headers: { ...cacheHeaders, 'Content-Type': 'image/png' },
          })
        }
      }

      const defaultOgpUrl = `https://${cloudflareHost}/ogp/default.png`
      const defaultRes = await fetch(defaultOgpUrl)
      if (defaultRes.ok) {
        return new Response(defaultRes.body, {
          headers: { ...cacheHeaders, 'Content-Type': 'image/png' },
        })
      }
    }
  } catch (err) {
    console.error('OG generation error:', err)
  }

  return new Response('Not Found', { status: 404 })
}
