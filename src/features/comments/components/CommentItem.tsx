import React, { useState } from 'react'
import { Comment } from '../types'
import { formatDate } from '@/utils/format'
import { CommentMenu } from './CommentMenu'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/elements/Form'
import { Button } from '@/components/elements/Button'
import { FaCheck } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'

type CommentItemProps = {
  comment: Comment
  userId: string
  handleDeleteComment: (commentId: number) => Promise<void>
}

const schema = z.object({
  body: z.string().min(1, '入力してください'),
})

type CommentValue = {
  body: string
}

export const CommentItem = ({ comment, userId, handleDeleteComment }: CommentItemProps) => {
  const [editedFlag, setEditedFlag] = useState(false)
  const { register, handleSubmit, reset, formState } = useForm<CommentValue>({
    mode: 'onChange',
    defaultValues: {
      body: comment.body,
    },
    resolver: zodResolver(schema),
  })
  return (
    <li
      aria-label={`comment-${comment.body}-${comment.id}`}
      className='w-full bg-white shadow-sm p-4'
    >
      <div className='flex justify-between mb-2'>
        <span className='font-bold'>{comment.commenterName}</span>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold opacity-50'>{formatDate(comment.createdAt)}</span>
        </div>
      </div>
      {editedFlag ? (
        <form
          className='flex flex-col'
          onSubmit={() => {
            console.log('aaa')
            setEditedFlag(false)
          }}
        >
          <Input
            className='w-full'
            type='text'
            error={formState.errors['body']}
            registration={register('body')}
          />
          <div className='flex w-full gap-2 mt-2 justify-end'>
            <Button type='submit' variant='outline'>
              <FaCheck />
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                setEditedFlag(false)
              }}
            >
              <GiCancel />
            </Button>
          </div>
        </form>
      ) : (
        <div className='flex justify-between'>
          <div className='max-w-96 break-words whitespace-pre-wrap'>{comment.body}</div>
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
}
