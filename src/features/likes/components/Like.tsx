import React from 'react'

import { Spinner } from '@/components/elements/Spinner'
import { Skeleton } from '@/components/ui/skeleton'

import { LikeButton } from '.'

type LikeProps = {
  like: () => void
  liked: boolean
  likeCount: number
  isLoading: boolean
}

export const Like = React.memo(({ like, liked, likeCount, isLoading }: LikeProps) => {
  if (isLoading)
    return (
      <div>
        <div className='flex gap-3'>
          <div className='cursor-pointer rounded-full border p-3'>
            <Spinner className='opacity-70' size='sm' />
          </div>
        </div>
        <Skeleton className='mx-auto mt-1.5 size-[15px]' />
      </div>
    )
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
