'use client'

import * as React from 'react'
import Script from 'next/script'
import { useFetchThemes } from '@/features/themes/hooks/useFetchThemes'
import { Theme as ThemeType } from '@/features/themes/types'
import { useRouter } from 'next/navigation'
import { Theme } from './Theme'
import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'
import { Card } from '@/components/ui/card'

export const Themes = () => {
  const router = useRouter()
  const { themes, isError, isLoading } = useFetchThemes()
  if (isLoading)
    return (
      <div className='grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-5'>
        {[...Array(6)].map((_, i) => {
          return (
            <Card key={i} className='w-[300px]'>
              <SkeletonCard />
            </Card>
          )
        })}
      </div>
    )
  if (isError) return <div>Error loading themes</div>

  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-5'>
      {themes?.map((theme: ThemeType) => {
        return (
          <div
            key={theme.id}
            onClick={() => router.push(`/themes/${theme.id}`)}
            className='cursor-pointer'
          >
            <Theme title={theme.title} themeId={theme.id} />
          </div>
        )
      })}
      <Script src={process.env.BUCKET_URL} />
    </div>
  )
}
