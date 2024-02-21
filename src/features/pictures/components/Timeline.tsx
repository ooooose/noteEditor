'use client'

import dynamic from 'next/dynamic'
import React from 'react'

import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchComments } from '@/features/comments/hooks/useFetchComments'
import { useFetchLikes } from '@/features/likes/hooks/useFetchLikes'

import { useFetchPictures } from '../hooks/useFetchPictures'

const DynamicPictures = dynamic(() => import('./Pictures'), {
  loading: () => (
    <div>
      <div className='grid w-[800px] grid-cols-3 grid-rows-2 gap-1'>
        {[...Array(6)].map((_, i) => {
          return <SkeletonCard key={i} />
        })}
      </div>
    </div>
  ),
})

const TimelineLayout = () => {
  const { pictures, isLoading: isPicturesLoading, isError } = useFetchPictures()
  const { comments, isLoading: isCommentsLoading } = useFetchComments()
  const { likes, isLoading: isLikesLoading } = useFetchLikes()
  const { user, isLoading: isUserLoading } = useFetchAuthUserByEmail()
  const isLoading = isPicturesLoading || isUserLoading || isCommentsLoading || isLikesLoading
  if (isLoading)
    return (
      <div>
        <div className='grid w-[800px] grid-cols-3 grid-rows-2 gap-1'>
          {[...Array(6)].map((_, i) => {
            return <SkeletonCard key={i} />
          })}
        </div>
      </div>
    )
  if (isError) return <>Error loading theme</>
  return <DynamicPictures comments={comments} likes={likes} pictures={pictures} user={user} />
}

export default TimelineLayout
