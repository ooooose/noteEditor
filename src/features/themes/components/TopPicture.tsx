'use client'

import React from 'react'
import { Picture as PictureType } from '@/features/pictures/types'
import { Picture } from '@/features/pictures/components/Picture'
import { useFetchPictures } from '@/features/pictures/hooks/useFetchPictures'
import { Skeleton } from '@/components/ui/skeleton'

type TopPictureProps = {
  themeId: string
}

export const TopPicture = ({ themeId }: TopPictureProps) => {
  const { pictures, isLoading } = useFetchPictures()
  if (isLoading) return <Skeleton className='w-[200px] h-[150px] mx-auto' />

  const themePictures = pictures?.filter((picture: PictureType) => picture.themeId === themeId)
  if (themePictures.length === 0)
    return <div className='w-[200px] h-[150px] mx-auto bg-gray-100'>No Image</div>
  const topPicutre = themePictures.reduce(
    (maxLikedPicture: PictureType, currentPicture: PictureType) => {
      return currentPicture.likes > maxLikedPicture.likes ? currentPicture : maxLikedPicture
    },
    themePictures[0],
  )
  return <Picture src={topPicutre.image} author={topPicutre.author} pictureId={topPicutre.id} />
}
