'use client'

import { useTopPictures } from '../api'

import { LoadingPictures } from './loading-pictures'
import { TopPicture } from './top-picture'

export const TopPictures = () => {
  const useTopPicturesQuery = useTopPictures({})
  if (useTopPicturesQuery.isLoading) return <LoadingPictures />

  return (
    <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-3'>
      {useTopPicturesQuery.data?.map((picture) => (
        <TopPicture key={picture.id} picture={picture} />
      ))}
    </div>
  )
}
