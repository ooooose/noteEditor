'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { CommentForm } from './CommentForm'
import { FaRegComment } from 'react-icons/fa'
import { CommentsList } from './CommentsList'
import { CommentCount } from './CommentCount'

type CommentProps = {
  pictureId: string
}

export const Comment = ({ pictureId }: CommentProps) => {
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
          <CommentsList pictureId={pictureId} />
          <CommentForm pictureId={pictureId} />
        </DialogContent>
      </Dialog>
      <CommentCount pictureId={pictureId} />
    </div>
  )
}
