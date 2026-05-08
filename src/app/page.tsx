import { Metadata } from 'next'
import { Suspense } from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'
import Main from '@/components/layouts/Main/Main'

import { baseURL } from '@/lib/constants/env'

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const pictureId = searchParams?.pictureId
  const imageUrl = searchParams?.imageUrl

  let ogImageUrl = `${baseURL}/api/og`
  if (pictureId) {
    ogImageUrl = imageUrl
      ? `${baseURL}/api/og?pictureId=${pictureId}&imageUrl=${imageUrl}`
      : `${baseURL}/api/og?pictureId=${pictureId}`
  }

  return {
    metadataBase: new URL(baseURL),
    title: '画HACK',
    description: 'あなたらしい絵を描くアプリ',
    openGraph: {
      title: '画HACK',
      description: 'あなたらしい絵を描くアプリ',
      images: [ogImageUrl],
    },
    twitter: {
      title: '画HACK',
      description: 'あなたらしい絵を描くアプリ',
      card: 'summary_large_image',
      images: [ogImageUrl],
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
