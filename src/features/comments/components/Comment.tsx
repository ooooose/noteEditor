'use client'

import React from 'react'
import { FaRegComment } from 'react-icons/fa'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useMutateComment } from '../hooks/useMutateComment'

import { CommentCount } from './CommentCount'
import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'

type CommentProps = {
  pictureId: string
}

export const Comment = React.memo(({ pictureId }: CommentProps) => {
  const {
    pictureComments,
    isLoading,
    onSubmitComment,
    handleDeleteComment,
    handleUpdateComment,
    userId,
  } = useMutateComment(pictureId)
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className='flex gap-3'>
            <div className='cursor-pointer rounded-full border p-3'>
              <FaRegComment className='text-gray-500' />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>コメント一覧</DialogTitle>
          </DialogHeader>
          <CommentsList
            comments={pictureComments}
            handleDeleteComment={handleDeleteComment}
            handleUpdateComment={handleUpdateComment}
            isLoading={isLoading}
            userId={userId}
          />
          <CommentForm onSubmit={onSubmitComment} />
        </DialogContent>
      </Dialog>
      <CommentCount commentCount={pictureComments?.length} isLoading={isLoading} />
    </div>
  )
})

Comment.displayName = 'Comment'
