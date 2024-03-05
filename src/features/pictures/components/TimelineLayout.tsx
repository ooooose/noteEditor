'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { useFetchThemes } from '@/features/themes/hooks/useFetchThemes'
import { Theme } from '@/features/themes/types'

import LoadingPictures from './LoadingPictures'
import Timeline from './Timeline'

const TimelineLayout = () => {
  const router = useRouter()
  const { themes, isLoading, isError } = useFetchThemes()
  if (isLoading) return <LoadingPictures />
  if (isError) return <>Error loading theme</>

  return (
    <div>
      <div className='flex gap-2'>
        {themes.map((theme: Theme) => {
          return (
            <div
              className='cursor-pointer rounded-full border p-2'
              key={theme.id}
              onClick={() => {
                router.push(`/timeline?theme=${theme.title}`)
              }}
            >
              #{theme.title}
            </div>
          )
        })}
      </div>
      <Timeline />
    </div>
  )
}

export default TimelineLayout
