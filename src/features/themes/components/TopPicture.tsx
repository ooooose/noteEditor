'use client'

import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { Picture } from '@/features/pictures/components/Picture'
import { useFetchPictures } from '@/features/pictures/hooks/useFetchPictures'
import { Picture as PictureType } from '@/features/pictures/types'

type TopPictureProps = {
  themeId: string
}

export const TopPicture = ({ themeId }: TopPictureProps) => {
  const { pictures, isLoading } = useFetchPictures()
  if (isLoading) return <Skeleton className='mx-auto h-[150px] w-[200px]' />

  const themePictures = pictures?.filter((picture: PictureType) => picture.themeId === themeId)
  if (themePictures.length === 0)
    return <div className='mx-auto h-[150px] w-[200px] bg-gray-100'>No Image</div>
  const topPicutre = themePictures.reduce(
    (maxLikedPicture: PictureType, currentPicture: PictureType) => {
      return currentPicture.likes > maxLikedPicture.likes ? currentPicture : maxLikedPicture
    },
    themePictures[0],
  )
  return <Picture author={topPicutre.author} frameId={topPicutre.frameId} src={topPicutre.image} />
}
