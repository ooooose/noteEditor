import Script from 'next/script'
import React from 'react'

import { AuthUser } from '@/features/auth/types'
import { Comment } from '@/features/comments/types'
import { Like } from '@/features/likes/types'

import { Picture as PictureType } from '../types'

import { PictureCard } from './PictureCard'

type PicutresProps = {
  pictures: PictureType[]
  comments: Comment[]
  likes: Like[]
  user: AuthUser
}

const Pictures = React.memo(({ pictures, comments, user, likes }: PicutresProps) => {
  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-10'>
      {pictures?.map((picture: PictureType) => {
        const commentsOfPicture = comments.filter((comment) => comment.pictureId === picture.id)
        const likesOfPicture = likes.filter((like) => like.pictureId == picture.id)
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
      <Script src={process.env.BUCKET_URL} />
    </div>
  )
})

export default Pictures
Pictures.displayName = 'Pictures'
