'use client'

import React from 'react'

import { CreateThemeModal } from '@/features/themes/components/CreateThemeModal'
import Themes from '@/features/themes/components/Themes'
import { useFetchThemes } from '@/features/themes/hooks/useFetchThemes'

import Timeline from './Timeline'

const TimelineLayout = () => {
  const { themes, isLoading, isError } = useFetchThemes()
  if (isError) return <>Error loading theme</>

  return (
    <div>
      <div className='mb-3 text-right'>
        <CreateThemeModal />
      </div>
      <div>
        <Themes isLoading={isLoading} themes={themes} />
        <Timeline />
      </div>
    </div>
  )
}

export default TimelineLayout
