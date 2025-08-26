'use client'

import { useTopPictures } from '../api'

import { LoadingPictures } from './loading-pictures'
import { TopPicture } from './top-picture'

export const TopPictures = () => {
  const useTopPicturesQuery = useTopPictures({})
  if (useTopPicturesQuery.isLoading) return <LoadingPictures />

  return (
    <div className='flex flex-col items-center gap-8 px-4 sm:grid sm:grid-cols-1 lg:grid-cols-3'>
      {useTopPicturesQuery.data?.map((picture) => (
        <TopPicture key={picture.id} picture={picture} />
      ))}
    </div>
  )
}
