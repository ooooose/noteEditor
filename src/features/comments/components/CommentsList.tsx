import React from 'react'
import type { Comment } from '../types'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils/format'
import { CommentMenu } from './CommentMenu'

type CommentsListProps = {
  isLoading: boolean
  comments: Comment[]
  handleDeleteComment: (commentId: number) => Promise<void>
  userId: string
}

export const CommentsList = ({
  isLoading,
  comments,
  handleDeleteComment,
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
            <li
              aria-label={`comment-${comment.body}-${index}`}
              key={`${comment.pictureId} - ${comment.userId} - ${index}`}
              className='w-full bg-white shadow-sm p-4'
            >
              <div className='flex justify-between mt-2'>
                <span className='font-bold'>{comment.commenterName}</span>
                <div className='flex flex-col'>
                  <span className='text-xs font-semibold opacity-50'>
                    {formatDate(comment.createdAt)}
                  </span>
                  {userId === comment.userId && (
                    <div className='text-right'>
                      <CommentMenu
                        commentId={comment.id}
                        handleDeleteComment={handleDeleteComment}
                      />
                    </div>
                  )}
                </div>
              </div>
              {comment.body}
            </li>
          )
        })
      ) : (
        <div>コメントはありません。</div>
      )}
    </ul>
  )
}
