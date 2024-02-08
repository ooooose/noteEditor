'use client'

import React from 'react'
import { LikeButton } from '.'
import { useMutateLike } from '../hooks/useMutateLike'

type LikeProps = {
  pictureId: string
}

export const Like = ({ pictureId }: LikeProps) => {
  const { like, isLike, Likes } = useMutateLike(pictureId)
  return (
    <div>
      <div className='flex gap-3'>
        <LikeButton like={like} isLike={!!isLike} />
      </div>
      <p className='text-xs mt-1'>{Likes} いいね</p>
    </div>
  )
}
