import Script from 'next/script'
import React from 'react'

import { AuthUser } from '@/features/auth/types'
import { Comment } from '@/features/comments/types'

import { Picture as PictureType } from '../types'

import { PictureCard } from './PictureCard'

type PicutresProps = {
  pictures: PictureType[]
  comments: Comment[]
  user: AuthUser
}

export const Pictures = React.memo(({ pictures, comments, user }: PicutresProps) => {
  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-10'>
      {pictures?.map((picture: PictureType) => {
        const commentsOfPictures =
          comments && comments.filter((comment) => comment.pictureId === picture.id)
        return (
          <PictureCard
            comments={commentsOfPictures}
            key={picture.id}
            picture={picture}
            user={user}
          />
        )
      })}
      <Script src={process.env.BUCKET_URL} />
    </div>
  )
})

Pictures.displayName = 'Pictures'
