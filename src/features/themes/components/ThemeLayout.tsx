'use client'

import React from 'react'
import { useFetchThemeById } from '../hooks/useFetchThemeById'
import { Pictures } from '@/features/pictures/components/Pictures'
import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

type ThemeLayoutProps = {
  id: string
}

export const ThemeLayout = ({ id }: ThemeLayoutProps) => {
  const { theme, isError, isLoading } = useFetchThemeById(id)
  if (isLoading)
    return (
      <div>
        <div className='text-center py-5'>
          <p className='p-2'>loading...</p>
        </div>
        <div className='grid grid-cols-3 grid-rows-2'>
          {[...Array(6)].map((_, i) => {
            return <SkeletonCard key={i} />
          })}
        </div>
      </div>
    )
  if (isError) return <>Error loading theme</>
  return (
    <div>
      <div className='text-center py-5'>
        <p className='p-2'>{theme.title}</p>
      </div>
      <Pictures pictures={theme.pictures} />
    </div>
  )
}
