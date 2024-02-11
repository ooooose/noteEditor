import React from 'react'
import { LikeButton } from '.'
import { Spinner } from '@/components/elements/Spinner'
import { Skeleton } from '@/components/ui/skeleton'

type LikeProps = {
  pictureId: string
  like: () => void
  liked: boolean
  likeCount: number
  isLoading: boolean
}

export const Like = ({ pictureId, like, liked, likeCount, isLoading }: LikeProps) => {
  if (isLoading)
    return (
      <div>
        <div className='flex gap-3'>
          <div className='p-3 border rounded-full cursor-pointer opacity-50' onClick={like}>
            <Spinner size='sm' />
          </div>
        </div>
        <Skeleton className='mt-1 w-[15px] h-[15px] mx-auto' />
      </div>
    )
  return (
    <div>
      <div className='flex gap-3'>
        <LikeButton like={like} isLike={liked} />
      </div>
      <p className='text-xs mt-1 text-center'>{likeCount}</p>
    </div>
  )
}
