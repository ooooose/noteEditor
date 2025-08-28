import { memo } from 'react'

import { useProfile } from '@/features/user/api'

import LoadingPictures from './LoadingPictures'
import { NoPictures } from './NoPictures'
import PictureCard from './PictureCard'

import type { Picture as PictureType } from '../types'

type PicturesProps = {
  pictures: PictureType[] | null
  isLoading?: boolean
}

const Pictures = memo(({ pictures, isLoading }: PicturesProps) => {
  const useProfileQuery = useProfile({})
  if (isLoading || useProfileQuery.isLoading) return <LoadingPictures />
  if (pictures?.length === 0) return <NoPictures />
  const getPictures = () => {
    return (
      <div className='grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 md:grid-cols-3'>
        {pictures?.map((picture: PictureType) => {
          return (
            <PictureCard
              key={picture.id}
              likes={picture.likes}
              picture={picture}
              user={useProfileQuery.data}
            />
          )
        })}
      </div>
    )
  }
  return <div>{getPictures()}</div>
})

export default Pictures
Pictures.displayName = 'Pictures'
