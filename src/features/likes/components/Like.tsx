import React from 'react'

import { LikeButton } from '.'

type LikeProps = {
  like: () => void
  liked: boolean
  likeCount: number
}

export const Like = React.memo(({ like, liked, likeCount }: LikeProps) => {
  return (
    <div>
      <div className='flex gap-3'>
        <LikeButton isLike={liked} like={like} />
      </div>
      <p className='mt-1.5 text-center text-xs'>{likeCount}</p>
    </div>
  )
})

Like.displayName = 'Like'
