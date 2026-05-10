import { Metadata } from 'next'
import { Suspense } from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'
import Main from '@/components/layouts/Main/Main'

import { baseURL } from '@/lib/constants/env'

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const imageName = searchParams?.imageName
  const cloudflareHost = process.env.CLOUDFLARE_URL

  const ogImage = cloudflareHost
    ? imageName
      ? `https://${cloudflareHost}/ogp/${decodeURIComponent(imageName)}`
      : `https://${cloudflareHost}/ogp/default.png`
    : `${baseURL}/api/og`

  return {
    metadataBase: new URL(baseURL),
    title: '画HACK',
    description: 'あなたらしい絵を描くアプリ',
    openGraph: {
      title: '画HACK',
      description: 'あなたらしい絵を描くアプリ',
      images: [ogImage],
    },
    twitter: {
      title: '画HACK',
      description: 'あなたらしい絵を描くアプリ',
      card: 'summary_large_image',
      images: [ogImage],
    },
  }
}

export default function Home() {
  return (
    <MainLayout>
      <Suspense>
        <Main />
      </Suspense>
    </MainLayout>
  )
}
