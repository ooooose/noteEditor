import { memo } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

type CommentCountProps = {
  commentCount: number
  isLoading: boolean
}

const CommentCount = memo(({ commentCount, isLoading }: CommentCountProps) => {
  if (isLoading) return <Skeleton className='mx-auto size-[15px]' />
  return <p className='text-center text-xs'>{commentCount}</p>
})

export default CommentCount
CommentCount.displayName = 'CommentCount'
