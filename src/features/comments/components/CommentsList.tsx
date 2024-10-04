import { memo } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import CommentItem from './CommentItem'

import type { Comment } from '../types'

type CommentsListProps = {
  isLoading: boolean
  comments: Comment[]
  userId: number
}

const CommentsList = memo(({ isLoading, comments, userId }: CommentsListProps) => {
  if (isLoading)
    return (
      <div className='w-full bg-white p-4 shadow-sm'>
        <Skeleton className='h-[30px] w-[200px]' />
      </div>
    )
  return (
    <ul aria-label='comments' className='flex h-60 flex-col space-y-3 overflow-y-auto'>
      {comments && comments.length !== 0 ? (
        comments.map((comment: Comment, index: number) => {
          return (
            <CommentItem
              comment={comment}
              key={`${comment.pictureId} - ${comment.userId} - ${index}`}
              userId={userId}
            />
          )
        })
      ) : (
        <div>コメントはありません。</div>
      )}
    </ul>
  )
})

export default CommentsList
CommentsList.displayName = 'CommentsList'
