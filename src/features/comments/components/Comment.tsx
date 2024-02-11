'use client'

import React from 'react'
import { Spinner } from '@/components/elements/Spinner'
import { Skeleton } from '@/components/ui/skeleton'
import { GoComment } from 'react-icons/go'

type CommentProps = {
  pictureId: string
  like: () => void
  liked: boolean
  likeCount: number
  isLoading: boolean
}

export const Comment = () => {
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
      <div className='flex gap-3'>
        <div className='p-3 border rounded-full cursor-pointer'>
          <GoComment className='text-gray-500' />
        </div>
      </div>
      {/* <p className='text-xs mt-1 text-center'>{commentCount}</p> */}
    </div>
  )
}
