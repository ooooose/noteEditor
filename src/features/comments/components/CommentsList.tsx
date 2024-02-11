'use client'

import React from 'react'
import type { Comment } from '../types'
import { useMutateComment } from '../hooks/useMutateComment'

type CommentsListProps = {
  pictureId: string
}

export const CommentsList = ({ pictureId }: CommentsListProps) => {
  const { pictureComments, isLoading } = useMutateComment(pictureId)
  if (isLoading) return <>...loading</>
  console.groupCollapsed(pictureComments)
  return (
    <ul aria-label='comments' className='flex flex-col space-y-3'>
      {pictureComments ? (
        pictureComments.map((comment: Comment, index: number) => {
          ;<li
            aria-label={`comment-${comment.body}-${index}`}
            key={`${comment.pictureId} - ${comment.userId}`}
            className='w-full bg-white shadow-sm p-4'
          >
            {comment.body}
          </li>
        })
      ) : (
        <div>コメントはありません。</div>
      )}
    </ul>
  )
}
