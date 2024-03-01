'use client'

import Link from 'next/link'
import Script from 'next/script'

import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'
import { Card } from '@/components/ui/card'

import { useFetchPictures } from '@/features/pictures/hooks/useFetchPictures'
import { Picture } from '@/features/pictures/types'
import { useFetchThemes } from '@/features/themes/hooks/useFetchThemes'
import { Theme as ThemeType } from '@/features/themes/types'

import { Theme } from './Theme'

export const Themes = () => {
  const { themes, isError, isLoading: isThemesLoading } = useFetchThemes()
  const { pictures, isLoading: isPicturesLoading } = useFetchPictures()
  const isLoading = isThemesLoading || isPicturesLoading
  if (isLoading)
    return (
      <div className='grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-5'>
        {[...Array(6)].map((_, i) => {
          return (
            <Card className='w-[300px]' key={i}>
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
        const picturesOfTheme = pictures.filter((picture: Picture) => picture.themeId === theme.id)
        return (
          <Link className='cursor-pointer' href={`/themes/${theme.id}`} key={theme.id}>
            <Theme pictures={picturesOfTheme} title={theme.title} />
          </Link>
        )
      })}
      <Script src={process.env.BUCKET_URL} />
    </div>
  )
}
