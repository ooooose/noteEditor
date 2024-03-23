import { memo } from 'react'

import { AuthUser } from '@/features/auth/types'

import { Picture as PictureType } from '../types'

import PictureCard from './PictureCard'

type PicturesProps = {
  pictures: PictureType[] | null
  user: AuthUser
  isLast: boolean
  loadMorePictures: () => void
}

const Pictures = memo(({ pictures, user, isLast, loadMorePictures }: PicturesProps) => {
  if (!pictures) return null
  const getPictures = () => {
    return (
      <div className='grid grid-cols-3 grid-rows-2 gap-10'>
        {pictures?.map((picture: PictureType) => {
          return (
            <PictureCard
              comments={picture.comments}
              key={picture.id}
              likes={picture.likes}
              picture={picture}
              user={user}
            />
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
})

export default Pictures
Pictures.displayName = 'Pictures'
