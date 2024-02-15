'use client'

import * as React from 'react'
import Link from 'next/link'
import { useFetchThemes } from '@/features/themes/hooks/useFetchThemes'
import { Theme as ThemeType } from '@/features/themes/types'
import { Theme } from './Theme'
import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'
import { Card } from '@/components/ui/card'

export const Themes = () => {
  const { themes, isError, isLoading } = useFetchThemes()
  if (isLoading)
    return (
      <div className='flex flex-wrap gap-x-3 gap-y-5'>
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
    <div className='flex flex-wrap gap-x-3 gap-y-5'>
      {themes?.map((theme: ThemeType) => {
        return (
          <Link key={theme.id} href={`/themes/${theme.id}`}>
            <Theme title={theme.title} themeId={theme.id} />
          </Link>
        )
      })}
    </div>
  )
}
