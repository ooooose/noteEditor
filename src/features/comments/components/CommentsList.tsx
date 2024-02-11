import React from 'react'
import type { Comment } from '../types'
import { Skeleton } from '@/components/ui/skeleton'

type CommentsListProps = {
  isLoading: boolean
  comments: Comment[]
}

export const CommentsList = ({ isLoading, comments }: CommentsListProps) => {
  if (isLoading)
    return (
      <div className='w-full bg-white shadow-sm p-4'>
        <Skeleton className='w-[200px] h-[30px]' />
      </div>
    )
  return (
    <ul aria-label='comments' className='flex flex-col space-y-3 max-h-60 overflow-y-auto'>
      {!!comments ? (
        comments.map((comment: Comment, index: number) => {
          return (
            <li
              aria-label={`comment-${comment.body}-${index}`}
              key={`${comment.pictureId} - ${comment.userId} - ${index}`}
              className='w-full bg-white shadow-sm p-4'
            >
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
