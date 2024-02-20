import Head from 'next/head'
import React from 'react'

import { ThemeLayout } from '@/features/themes/components/ThemeLayout'

function Theme({ params }: { params: { id: string } }) {
  return (
    <div>
      <Head>
        <title>画HACK</title>
        <link as='image' fetchPriority='high' href={process.env.BUCKET_URL} rel='preload' />
      </Head>
      <ThemeLayout id={params.id} />
    </div>
  )
}

export default Theme
