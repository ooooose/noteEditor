import { memo } from 'react'

import { useUser } from '@/features/user/api'

import LoadingPictures from './LoadingPictures'
import { NoPictures } from './NoPictures'
import PictureCard from './PictureCard'

import type { Picture as PictureType } from '../types'

type PicturesProps = {
  pictures: PictureType[] | null
  isLoading?: boolean
}

const Pictures = memo(({ pictures, isLoading }: PicturesProps) => {
  const currentUserQuery = useUser({})
  if (isLoading) return <LoadingPictures />
  if (pictures?.length === 0) return <NoPictures />
  const getPictures = () => {
    return (
      <div className='grid grid-cols-3 grid-rows-2 gap-10'>
        {pictures?.map((picture: PictureType) => {
          return (
            <PictureCard
              key={picture.id}
              likes={picture.likes}
              picture={picture}
              user={currentUserQuery.data}
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
