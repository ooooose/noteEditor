import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useMutateLike } from '../hooks/useMutateLike'

type UnlikeButtonType = {
  pictureId: string
}

export const UnlikeButton = ({ pictureId }: UnlikeButtonType) => {
  const { handleUnlike } = useMutateLike(pictureId)
  return (
    <div className='p-3 border rounded-full cursor-pointer' onClick={handleUnlike}>
      <FaHeart color='red' />
    </div>
  )
}
