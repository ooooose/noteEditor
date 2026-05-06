'use client'

import React, { Suspense } from 'react'

import Timeline from './Timeline'

const TimelineLayout = () => {
  return (
    <div className='mx-auto w-full'>
      <div className='mx-auto max-w-4xl px-1 pt-6 sm:pt-10'>
        <p className='text-xs font-semibold tracking-[0.35em] text-gray-500'>TIMELINE</p>
        <h1 className='mt-2 text-2xl font-semibold tracking-tight sm:text-3xl'>展示一覧</h1>
      </div>
      <div className='mt-6 rounded-3xl border border-white/40 bg-white/50 p-4 backdrop-blur sm:p-6'>
        <Suspense fallback={<div className='text-sm text-gray-500'>Loading...</div>}>
          <Timeline />
        </Suspense>
      </div>
    </div>
  )
}

export default TimelineLayout
