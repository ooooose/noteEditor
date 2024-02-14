import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

type CommentCountProps = {
  commentCount: number
  isLoading: boolean
}

export const CommentCount = React.memo(({ commentCount, isLoading }: CommentCountProps) => {
  if (isLoading) return <Skeleton className='w-[15px] h-[15px] mx-auto' />
  return <p className='text-xs text-center'>{commentCount}</p>
})

CommentCount.displayName = 'CommentCount'
