'use client'

import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { useMutateLike } from '../hooks/useMutateLike'

type LikeButtonType = {
  pictureId: string
}

export const LikeButton = ({ pictureId }: LikeButtonType) => {
  const { handleLike } = useMutateLike(pictureId)
  return (
    <div className='p-3 border rounded-full cursor-pointer' onClick={handleLike}>
      <FaRegHeart />
    </div>
  )
}
