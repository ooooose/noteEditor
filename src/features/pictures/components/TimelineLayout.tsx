'use client'

import React, { Suspense } from 'react'

import Timeline from './Timeline'

const TimelineLayout = () => {
  return (
    <div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Timeline />
        </Suspense>
      </div>
    </div>
  )
}

export default TimelineLayout
