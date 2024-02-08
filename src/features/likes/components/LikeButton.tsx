import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useMutateLike } from '../hooks/useMutateLike'

type UnlikeButtonType = {
  like: () => void
  isLike: boolean
}

export const LikeButton = ({ like, isLike }: UnlikeButtonType) => {
  return (
    <div className='p-3 border rounded-full cursor-pointer' onClick={like}>
      <FaHeart className={isLike ? 'text-red-500' : ' text-gray-500 opacity-50'} />
    </div>
  )
}
