import { useSearchParams } from 'next/navigation'
import React from 'react'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'

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
    size,
    isLast,
    loadMorePictures,
  } = useFetchPictures(theme)
  const { user, isLoading: isUserLoading } = useFetchAuthUserByEmail()
  const isLoading = isPicturesLoading || isUserLoading
  if (isLoading) return <LoadingPictures />
  if (error) return <>Error loading theme</>
  if (pictures?.length === 0) return <NoPictures />
  const height = `h-[${size * 600}px] mt-5`
  return (
    <div className={height}>
      <Pictures
        isLast={isLast}
        isLoading={isLoading}
        loadMorePictures={loadMorePictures}
        pictures={pictures}
        user={user}
      />
    </div>
  )
}
export default Timeline
