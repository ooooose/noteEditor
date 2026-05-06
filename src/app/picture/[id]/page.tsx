import { redirect } from 'next/navigation'

import { baseURL } from '@/lib/constants/env'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL ?? ''

  try {
    const res = await fetch(`${apiURL}/api/v1/pictures/${params.id}`, {
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch picture')
    }

    const data = await res.json()
    const picture = data.data.attributes
    const title = picture.theme?.title || '画HACK'
    const description = picture.description || 'あなただけの絵を描くアプリ'
    const ogImageUrl = `${baseURL}/api/og?pictureId=${params.id}`

    return {
      title: `${title} | 画HACK`,
      description,
      openGraph: {
        title: `${title} | 画HACK`,
        description,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | 画HACK`,
        description,
        images: [ogImageUrl],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)

    return {
      title: '画HACK',
      description: 'あなただけの絵を描くアプリ',
      openGraph: {
        title: '画HACK',
        description: 'あなただけの絵を描くアプリ',
      },
      twitter: {
        card: 'summary_large_image',
        title: '画HACK',
        description: 'あなただけの絵を描くアプリ',
      },
    }
  }
}

export default function PicturePage({ params }: { params: { id: string } }) {
  redirect(`/?pictureId=${params.id}`)
}
