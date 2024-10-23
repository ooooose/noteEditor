import { memo } from 'react'

import { formatDate } from '@/utils/format'

import { DeleteComment } from './DeleteComment'

import type { Comment } from '../types'

type CommentItemProps = {
  comment: Comment
  userId: number | undefined
}

const CommentItem = memo(({ comment, userId }: CommentItemProps) => {
  return (
    <li
      aria-label={`comment-${comment.body}-${comment.id}`}
      className='w-full bg-white p-4 shadow-sm'
    >
      <div className='mb-2 flex justify-between'>
        <span className='font-bold'>{comment.user.name}</span>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold opacity-50'>{formatDate(comment.createdAt)}</span>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='max-w-96 whitespace-pre-wrap break-words'>{comment.body}</div>
        {Number(userId) === comment.userId && (
          <div className='text-right'>
            <DeleteComment commentId={comment.id} pictureId={comment.pictureId} />
          </div>
        )}
      </div>
    </li>
  )
})

export default CommentItem
CommentItem.displayName = 'CommentItem'
