'use client'

import React from 'react'

import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

import { Pictures } from '@/features/pictures/components/Pictures'

import { useFetchThemeById } from '../hooks/useFetchThemeById'

type ThemeLayoutProps = {
  id: string
}

export const ThemeLayout = ({ id }: ThemeLayoutProps) => {
  const { theme, isError, isLoading } = useFetchThemeById(id)
  if (isLoading)
    return (
      <div>
        <div className='py-5 text-center'>
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
      <div className='py-5 text-center'>
        <p className='p-2'>{theme.title}</p>
      </div>
      <Pictures pictures={theme.pictures} />
    </div>
  )
}
