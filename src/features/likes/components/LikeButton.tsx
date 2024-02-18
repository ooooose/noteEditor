import React from 'react'
import { FaHeart } from 'react-icons/fa'

type UnlikeButtonType = {
  like: () => void
  isLike: boolean
}

export const LikeButton = React.memo(({ like, isLike }: UnlikeButtonType) => {
  return (
    <div className='cursor-pointer rounded-full border p-3' onClick={like}>
      <FaHeart className={isLike ? 'text-red-500' : ' text-gray-500 opacity-50'} />
    </div>
  )
})

LikeButton.displayName = 'LikeButton'
