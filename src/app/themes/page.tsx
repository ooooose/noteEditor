import Head from 'next/head'
import React from 'react'

import ThemesLayout from '@/features/themes/components/ThemesLayout'

function Themes() {
  return (
    <div>
      <Head>
        <title>画HACK</title>
        <link as='image' fetchPriority='high' href={process.env.BUCKET_URL} rel='preload' />
      </Head>
      <ThemesLayout />
    </div>
  )
}

export default Themes
