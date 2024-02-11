'use client'

import React from 'react'
import { useMutateComment } from '../hooks/useMutateComment'
import { Skeleton } from '@/components/ui/skeleton'

type CommentCountProps = {
  pictureId: string
}

export const CommentCount = ({ pictureId }: CommentCountProps) => {
  const { pictureComments, isLoading } = useMutateComment(pictureId)
  if (isLoading) return <Skeleton className='w-[15px] h-[15px] mx-auto' />
  return <p className='text-xs text-center'>{pictureComments.length}</p>
}
