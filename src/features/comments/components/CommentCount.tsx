import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

type CommentCountProps = {
  commentCount: number
  isLoading: boolean
}

export const CommentCount = React.memo(({ commentCount, isLoading }: CommentCountProps) => {
  if (isLoading) return <Skeleton className='mx-auto size-[15px]' />
  return <p className='text-center text-xs'>{commentCount}</p>
})

CommentCount.displayName = 'CommentCount'
