'use client'

import React, { Suspense } from 'react'

import Themes from '@/features/themes/components/Themes'
import { useFetchThemes } from '@/features/themes/hooks/useFetchThemes'

import Timeline from './Timeline'

const TimelineLayout = () => {
  const { themes, isLoading, isError } = useFetchThemes()
  if (isError) return <>Error loading theme</>

  return (
    <div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Themes isLoading={isLoading} themes={themes} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Timeline />
        </Suspense>
      </div>
    </div>
  )
}

export default TimelineLayout
