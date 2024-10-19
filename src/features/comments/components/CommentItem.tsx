import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { formatDate } from '@/utils/format'

import { UpdateCommentInput, updateCommentInputSchema, useUpdateComment } from '../api'

import CommentMenu from './CommentMenu'
import { EditComment } from './EditComment'

import type { Comment } from '../types'

type CommentItemProps = {
  comment: Comment
  userId: number
}

const CommentItem = memo(({ comment, userId }: CommentItemProps) => {
  const [editedFlag, setEditedFlag] = useState(false)
  const updateCommentMutation = useUpdateComment({
    pictureId: comment.pictureId,
    mutationConfig: {
      onSuccess: () => {
        toast.success('コメントを更新しました')
        setEditedFlag(false)
      },
      onError: () => {
        toast.error('コメントの更新に失敗しました')
      },
    },
  })

  const form = useForm<UpdateCommentInput>({
    resolver: zodResolver(updateCommentInputSchema),
    mode: 'onSubmit',
  })

  const onSubmit = useCallback<SubmitHandler<UpdateCommentInput>>(
    (values) => {
      updateCommentMutation.mutate({
        commentId: comment.id,
        data: { body: values.body },
      })
    },
    [updateCommentMutation, comment.id],
  )

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
      {editedFlag ? (
        <EditComment form={form} onSubmit={onSubmit} setEditedFlag={setEditedFlag} />
      ) : (
        <div className='flex justify-between'>
          <div className='max-w-96 whitespace-pre-wrap break-words'>{comment.body}</div>
          {userId === comment.userId && (
            <div className='text-right'>
              <CommentMenu
                commentId={comment.id}
                pictureId={comment.pictureId}
                setEditedFlag={setEditedFlag}
              />
            </div>
          )}
        </div>
      )}
    </li>
  )
})

export default CommentItem
CommentItem.displayName = 'CommentItem'
