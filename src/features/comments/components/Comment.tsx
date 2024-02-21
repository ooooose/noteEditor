'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { FaRegComment } from 'react-icons/fa'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { AuthUser } from '@/features/auth/types'

import { useMutateComment } from '../hooks/useMutateComment'
import { Comment as CommentType } from '../types'

const DynamicCommentCount = dynamic(() => import('./CommentCount'))
const DynamicCommentForm = dynamic(() => import('./CommentForm'))
const DynamicCommentList = dynamic(() => import('./CommentsList'))

type CommentProps = {
  pictureId: string
  comments: CommentType[]
  user: AuthUser
}

export const Comment = React.memo(({ pictureId, comments, user }: CommentProps) => {
  const { isLoading, onSubmitComment, handleDeleteComment, handleUpdateComment } = useMutateComment(
    pictureId,
    user,
  )
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
          <DynamicCommentList
            comments={comments}
            handleDeleteComment={handleDeleteComment}
            handleUpdateComment={handleUpdateComment}
            isLoading={isLoading}
            userId={user.id}
          />
          <DynamicCommentForm onSubmit={onSubmitComment} />
        </DialogContent>
      </Dialog>
      <DynamicCommentCount commentCount={comments?.length} isLoading={isLoading} />
    </div>
  )
})

Comment.displayName = 'Comment'
