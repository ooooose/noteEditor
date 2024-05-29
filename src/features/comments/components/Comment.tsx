'use client'

import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { memo } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useMutateComment } from '../hooks/useMutateComment'

import CommentCount from './CommentCount'
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'

import type { AuthUser } from '@/features/auth/types'

type CommentProps = {
  pictureId: string
  user: AuthUser
}

const Comment = memo(({ pictureId, user }: CommentProps) => {
  const { isLoading, onSubmitComment, handleDeleteComment, comments, handleUpdateComment } =
    useMutateComment(pictureId, user)
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className='flex gap-3'>
            <div className='cursor-pointer rounded-full border p-3'>
              <ChatBubbleIcon className='text-gray-500' />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>コメント一覧</DialogTitle>
          </DialogHeader>
          <CommentsList
            comments={comments}
            handleDeleteComment={handleDeleteComment}
            handleUpdateComment={handleUpdateComment}
            isLoading={isLoading}
            userId={user.id}
          />
          <CommentForm onSubmit={onSubmitComment} />
        </DialogContent>
      </Dialog>
      <CommentCount commentCount={comments?.length} isLoading={isLoading} />
    </div>
  )
})

export default Comment
Comment.displayName = 'Comment'
