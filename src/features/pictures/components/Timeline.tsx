import { useSearchParams } from 'next/navigation'
import React from 'react'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchComments } from '@/features/comments/hooks/useFetchComments'
import { useFetchLikes } from '@/features/likes/hooks/useFetchLikes'

import { useFetchPictures } from '../hooks/useFetchPictures'

import LoadingPictures from './LoadingPictures'
import { NoPictures } from './NoPictures'
import Pictures from './Pictures'

const Timeline = () => {
  const searchParams = useSearchParams()
  const theme = (searchParams.get('theme') as string) || undefined
  const {
    pictures,
    isLoading: isPicturesLoading,
    error,
    isLast,
    loadMorePictures,
  } = useFetchPictures(theme)
  const { comments, isLoading: isCommentsLoading } = useFetchComments()
  const { likes, isLoading: isLikesLoading } = useFetchLikes()
  const { user, isLoading: isUserLoading } = useFetchAuthUserByEmail()
  const isLoading = isPicturesLoading || isUserLoading || isCommentsLoading || isLikesLoading
  if (isLoading) return <LoadingPictures />
  if (error) return <>Error loading theme</>
  if (pictures?.length === 0) return <NoPictures />
  return (
    <Pictures
      comments={comments}
      isLast={isLast}
      likes={likes}
      loadMorePictures={loadMorePictures}
      pictures={pictures}
      user={user}
    />
  )
}
export default Timeline
