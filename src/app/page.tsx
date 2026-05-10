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
  const imageName = searchParams?.imageName

  let ogImageUrl = `${baseURL}/api/og`
  if (pictureId) {
    ogImageUrl = imageUrl
      ? `${baseURL}/api/og?pictureId=${pictureId}&imageUrl=${encodeURIComponent(imageUrl)}`
      : `${baseURL}/api/og?pictureId=${pictureId}`
  } else if (imageName) {
    ogImageUrl = `${baseURL}/api/og?imageName=${encodeURIComponent(imageName)}`
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
