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

import { User } from '@/features/user/types'

import { useComments } from '../api'

import CommentCount from './CommentCount'
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'

type CommentProps = {
  pictureId: number
  user: User
}

const Comment = memo(({ pictureId, user }: CommentProps) => {
  const commentsQuery = useComments({ pictureId })
  if (commentsQuery.isLoading) return <div>コメントを取得中...</div>
  if (commentsQuery.isError) return <div>コメントの取得に失敗しました</div>
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
            comments={commentsQuery?.data}
            isLoading={commentsQuery.isLoading}
            userId={user.id}
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
