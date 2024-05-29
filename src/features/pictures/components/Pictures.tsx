import { memo } from 'react'

import LoadingPictures from './LoadingPictures'
import { NoPictures } from './NoPictures'
import PictureCard from './PictureCard'

import type { Picture as PictureType } from '../types'
import type { AuthUser } from '@/features/auth/types'

type PicturesProps = {
  pictures: PictureType[] | null
  user: AuthUser
  isLoading: boolean
  isLast?: boolean
  loadMorePictures: () => void
}

const Pictures = memo(
  ({ pictures, user, isLast = false, isLoading, loadMorePictures }: PicturesProps) => {
    if (!pictures) return null
    if (isLoading) return <LoadingPictures />
    if (pictures.length === 0) return <NoPictures />
    const getPictures = () => {
      return (
        <div className='grid grid-cols-3 grid-rows-2 gap-10'>
          {pictures?.map((picture: PictureType) => {
            return (
              <PictureCard key={picture.id} likes={picture.likes} picture={picture} user={user} />
            )
          })}
        </div>
      )
    }
    return (
      <div>
        {getPictures()}
        {isLast === false && (
          <div className='mt-16 text-center'>
            <button className='text-blue-400' onClick={loadMorePictures}>
              続きを読み込む
            </button>
          </div>
        )}
      </div>
    )
  },
)

export default Pictures
Pictures.displayName = 'Pictures'
