import Head from 'next/head'
import React from 'react'

import TimelineLayout from '@/features/pictures/components/Timeline'

function Timeline() {
  return (
    <div>
      <Head>
        <link as='image' fetchPriority='high' href={process.env.BUCKET_URL} rel='preload' />
      </Head>
      <div className='py-5 text-center'>
        <p className='p-2'>タイムライン</p>
      </div>
      <TimelineLayout />
    </div>
  )
}

export default Timeline
