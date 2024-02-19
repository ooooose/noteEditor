'use client'

import React from 'react'

import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchComments } from '@/features/comments/hooks/useFetchComments'

import { useFetchPictures } from '../hooks/useFetchPictures'

import { Pictures } from './Pictures'

export const TimelineLayout = () => {
  const { pictures, isLoading: isPicturesLoading, isError } = useFetchPictures()
  const { comments } = useFetchComments()
  const { user, isLoading: isUserLoading } = useFetchAuthUserByEmail()
  const isLoading = isPicturesLoading || isUserLoading
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
  return <Pictures comments={comments} pictures={pictures} user={user} />
}
