import React from 'react'
import type { Comment } from '../types'
import { Skeleton } from '@/components/ui/skeleton'
import { CommentItem } from './CommentItem'

type CommentsListProps = {
  isLoading: boolean
  comments: Comment[]
  handleDeleteComment: (commentId: number) => Promise<void>
  handleUpdateComment: (commentId: number, body: string) => Promise<void>
  userId: string
}

export const CommentsList = ({
  isLoading,
  comments,
  handleDeleteComment,
  handleUpdateComment,
  userId,
}: CommentsListProps) => {
  if (isLoading)
    return (
      <div className='w-full bg-white shadow-sm p-4'>
        <Skeleton className='w-[200px] h-[30px]' />
      </div>
    )
  return (
    <ul aria-label='comments' className='flex flex-col space-y-3 h-60 overflow-y-auto'>
      {!!comments ? (
        comments.map((comment: Comment, index: number) => {
          return (
            <CommentItem
              key={`${comment.pictureId} - ${comment.userId} - ${index}`}
              comment={comment}
              userId={userId}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
            />
          )
        })
      ) : (
        <div>コメントはありません。</div>
      )}
    </ul>
  )
}
