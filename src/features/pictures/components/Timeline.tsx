'use client'

import React from 'react'

import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchComments } from '@/features/comments/hooks/useFetchComments'
import { useFetchLikes } from '@/features/likes/hooks/useFetchLikes'

import { useFetchPictures } from '../hooks/useFetchPictures'

import { Pictures } from './Pictures'

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
  return <Pictures comments={comments} likes={likes} pictures={pictures} user={user} />
}

export default TimelineLayout
