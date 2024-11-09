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
import { Skeleton } from '@/components/ui/skeleton'

import { User } from '@/features/user/types'

import { useComments } from '../api'

import CommentCount from './CommentCount'
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'

type CommentProps = {
  pictureId: number
  user: User | undefined
}

const Comment = memo(({ pictureId, user }: CommentProps) => {
  const commentsQuery = useComments({ pictureId })
  if (commentsQuery.isLoading) return <Skeleton className='size-[50px] rounded-full' />
  if (commentsQuery.isError)
    return (
      <div className='flex gap-3'>
        <div className='rounded-full border p-3 text-red-500'>
          <ChatBubbleIcon className='text-red-500' />
        </div>
      </div>
    )
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
            comments={commentsQuery?.data ?? []}
            isLoading={commentsQuery.isLoading}
            userId={user?.id}
          />
          <CommentForm pictureId={pictureId} />
        </DialogContent>
      </Dialog>
      <CommentCount
        commentCount={commentsQuery?.data?.length}
        isLoading={commentsQuery.isLoading}
      />
    </div>
  )
})

export default Comment
Comment.displayName = 'Comment'
