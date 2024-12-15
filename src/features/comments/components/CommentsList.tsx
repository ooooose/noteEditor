import { MessageCircle } from 'lucide-react'
import { memo } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import CommentItem from './CommentItem'

import type { Comment } from '../types'

type CommentsListProps = {
  isLoading: boolean
  comments: Comment[]
  userId: number | undefined
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
        <div className='flex flex-col items-center justify-center py-10'>
          <div className='flex size-20 items-center justify-center rounded-full bg-blue-50'>
            <MessageCircle className='size-10 text-blue-500' />
          </div>
          <div className='mt-3 space-y-2 text-center'>
            <p className='text-xl font-medium text-gray-900'>まだコメントはありません</p>
            <p className='text-sm text-gray-500'>最初のコメントを投稿してみましょう！</p>
          </div>
        </div>
      )}
    </ul>
  )
})

export default CommentsList
CommentsList.displayName = 'CommentsList'
