'use client'

import React from 'react'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchComments } from '@/features/comments/hooks/useFetchComments'
import { useFetchLikes } from '@/features/likes/hooks/useFetchLikes'

import { useFetchPictures } from '../hooks/useFetchPictures'

import LoadingPictures from './LoadingPictures'
import Pictures from './Pictures'

const TimelineLayout = () => {
  const { pictures, isLoading: isPicturesLoading, isError } = useFetchPictures()
  const { comments, isLoading: isCommentsLoading } = useFetchComments()
  const { likes, isLoading: isLikesLoading } = useFetchLikes()
  const { user, isLoading: isUserLoading } = useFetchAuthUserByEmail()
  const isLoading = isPicturesLoading || isUserLoading || isCommentsLoading || isLikesLoading
  if (isLoading) return <LoadingPictures />
  if (isError) return <>Error loading theme</>

  return <Pictures comments={comments} likes={likes} pictures={pictures} user={user} />
}

export default TimelineLayout
