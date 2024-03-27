import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircledIcon, Cross2Icon } from '@radix-ui/react-icons'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Form'

import { formatDate } from '@/utils/format'

import CommentMenu from './CommentMenu'

import type { Comment } from '../types'

type CommentItemProps = {
  comment: Comment
  userId: string
  handleDeleteComment: (commentId: number) => Promise<void>
  handleUpdateComment: (commentId: number, body: string) => Promise<void>
}

const schema = z.object({
  body: z.string().min(1, '入力してください'),
})

type CommentValue = {
  body: string
}

const CommentItem = memo(
  ({ comment, userId, handleDeleteComment, handleUpdateComment }: CommentItemProps) => {
    const [editedFlag, setEditedFlag] = useState(false)
    const { register, handleSubmit, formState } = useForm<CommentValue>({
      mode: 'onChange',
      defaultValues: {
        body: comment.body,
      },
      resolver: zodResolver(schema),
    })
    return (
      <li
        aria-label={`comment-${comment.body}-${comment.id}`}
        className='w-full bg-white p-4 shadow-sm'
      >
        <div className='mb-2 flex justify-between'>
          <span className='font-bold'>{comment.commenterName}</span>
          <div className='flex flex-col'>
            <span className='text-xs font-semibold opacity-50'>
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>
        {editedFlag ? (
          <form
            className='flex flex-col'
            onSubmit={handleSubmit(async (values) => {
              await handleUpdateComment(comment.id, values.body)
              setEditedFlag(false)
            })}
          >
            <Input
              className='w-full'
              error={formState.errors['body']}
              registration={register('body')}
              type='text'
            />
            <div className='mt-2 flex w-full justify-end gap-2'>
              <Button type='submit' variant='outline'>
                <CheckCircledIcon />
              </Button>
              <Button
                onClick={() => {
                  setEditedFlag(false)
                }}
                variant='outline'
              >
                <Cross2Icon />
              </Button>
            </div>
          </form>
        ) : (
          <div className='flex justify-between'>
            <div className='max-w-96 whitespace-pre-wrap break-words'>{comment.body}</div>
            {userId === comment.userId && (
              <div className='text-right'>
                <CommentMenu
                  commentId={comment.id}
                  handleDeleteComment={handleDeleteComment}
                  setEditedFlag={setEditedFlag}
                />
              </div>
            )}
          </div>
        )}
      </li>
    )
  },
)

export default CommentItem
CommentItem.displayName = 'CommentItem'
