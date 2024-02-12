'use client'

import React, { useState } from 'react'

import { useMutateComment } from '../hooks/useMutateComment'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { FaRegComment } from 'react-icons/fa'
import { CommentsList } from './CommentsList'
import { CommentCount } from './CommentCount'
import { CommentForm } from './CommentForm'

type CommentProps = {
  pictureId: string
}

export const Comment = ({ pictureId }: CommentProps) => {
  const { pictureComments, isLoading, onSubmitComment, handleDeleteComment, userId } =
    useMutateComment(pictureId)
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className='flex gap-3'>
            <div className='p-3 border rounded-full cursor-pointer'>
              <FaRegComment className='text-gray-500' />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>コメント一覧</DialogTitle>
          </DialogHeader>
          <CommentsList
            isLoading={isLoading}
            comments={pictureComments}
            handleDeleteComment={handleDeleteComment}
            userId={userId}
          />
          <CommentForm onSubmit={onSubmitComment} />
        </DialogContent>
      </Dialog>
      <CommentCount isLoading={isLoading} commentCount={pictureComments?.length} />
    </div>
  )
}
