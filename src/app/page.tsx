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
  return {
    metadataBase: new URL(`https://gahack.net?pictureId=${pictureId}`),
    title: '画HACK',
    description: 'あなたらしい絵を描くアプリ',
    twitter: {
      title: '画HACK',
      description: 'あなたらしい絵を描くアプリ',
      card: 'summary_large_image',
      images: [`${baseURL}/og?pictureId=${pictureId}`],
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
