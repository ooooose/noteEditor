'use client'

import React from 'react'
import { Spinner } from '@/components/elements/Spinner'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { CommentForm } from './CommentForm'
import { FaRegComment } from 'react-icons/fa'
import { CommentsList } from './CommentsList'

type CommentProps = {
  pictureId: string
}

export const Comment = ({ pictureId }: CommentProps) => {
  // if (isLoading)
  //   return (
  //     <div>
  //       <div className='flex gap-3'>
  //         <div className='p-3 border rounded-full cursor-pointer opacity-50' onClick={like}>
  //           <Spinner size='sm' />
  //         </div>
  //       </div>
  //       <Skeleton className='mt-1 w-[15px] h-[15px] mx-auto' />
  //     </div>
  //   )
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
      {/* <p className='text-xs mt-1 text-center'>{commentCount}</p> */}
    </div>
  )
}
