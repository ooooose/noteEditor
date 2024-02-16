import React from 'react'
import { CanvasLayout } from '@/features/pictures/components/canvas/Layout'
import Head from 'next/head'

function Canvas() {
  return (
    <div>
      <Head>
        <title>画HACK | 絵を描く</title>
      </Head>
      <CanvasLayout />
    </div>
  )
}

export default Canvas
