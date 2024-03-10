import { memo } from 'react'

import { AuthUser } from '@/features/auth/types'
import { Comment } from '@/features/comments/types'
import { Like } from '@/features/likes/types'

import { Picture as PictureType } from '../types'

import PictureCard from './PictureCard'

type PicturesProps = {
  pictures: PictureType[] | null
  comments: Comment[]
  likes: Like[]
  user: AuthUser
  isLast: boolean
  loadMorePictures: () => void
}

const Pictures = memo(
  ({ pictures, comments, user, likes, isLast, loadMorePictures }: PicturesProps) => {
    if (!pictures) return null
    const getPictures = () => {
      return (
        <div className='grid grid-cols-3 grid-rows-2 gap-10'>
          {pictures?.map((picture: PictureType) => {
            const commentsOfPicture = comments?.filter(
              (comment) => comment.pictureId === picture.id,
            )
            const likesOfPicture = likes?.filter((like) => like.pictureId == picture.id)
            return (
              <PictureCard
                comments={commentsOfPicture}
                key={picture.id}
                likes={likesOfPicture}
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
          <div className='mt-4 text-center'>
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
