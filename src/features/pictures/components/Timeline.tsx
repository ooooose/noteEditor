'use client'

import React from 'react'
import { Pictures } from './Pictures'
import { useFetchPictures } from '../hooks/useFetchPictures'
import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

export const TimelineLayout = () => {
  const { pictures, isLoading, isError } = useFetchPictures()
  if (isLoading)
    return (
      <div>
        <div className='flex flex-wrap gap-x-3 gap-y-5'>
          {[...Array(6)].map((_, i) => {
            return <SkeletonCard key={i} />
          })}
        </div>
      </div>
    )
  if (isError) return <>Error loading theme</>
  return <Pictures pictures={pictures} />
}
