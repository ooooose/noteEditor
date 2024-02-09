'use client'

import React from 'react'
import { LikeButton } from '.'
import { useMutateLike } from '../hooks/useMutateLike'
import { Spinner } from '@/components/elements/Spinner'
import { Skeleton } from '@/components/ui/skeleton'

type LikeProps = {
  pictureId: string
}

export const Like = ({ pictureId }: LikeProps) => {
  const { like, isLike, Likes, isLoading } = useMutateLike(pictureId)
  if (isLoading)
    return (
      <div>
        <div className='flex gap-3'>
          <div className='p-3 border rounded-full cursor-pointer opacity-50' onClick={like}>
            <Spinner size='sm' />
          </div>
        </div>
        <Skeleton className='mt-1 w-[50px] h-[20px]' />
      </div>
    )
  return (
    <div>
      <div className='flex gap-3'>
        <LikeButton like={like} isLike={!!isLike} />
      </div>
      <p className='text-xs mt-1'>{Likes} いいね</p>
    </div>
  )
}
