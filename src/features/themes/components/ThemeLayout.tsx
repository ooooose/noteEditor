'use client'

import { memo } from 'react'

import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchComments } from '@/features/comments/hooks/useFetchComments'
import { useFetchLikes } from '@/features/likes/hooks/useFetchLikes'
import Pictures from '@/features/pictures/components/Pictures'

import { useFetchThemeById } from '../hooks/useFetchThemeById'

type ThemeLayoutProps = {
  id: string
}

const ThemeLayout = memo(({ id }: ThemeLayoutProps) => {
  const { theme, isError, isLoading: isThemeLoading } = useFetchThemeById(id)
  const { comments, isLoading: isCommentsLoading } = useFetchComments()
  const { likes, isLoading: isLikesLoading } = useFetchLikes()
  const { user, isLoading: isUserLoading } = useFetchAuthUserByEmail()
  const isLoading = isThemeLoading || isUserLoading || isCommentsLoading || isLikesLoading
  if (isLoading)
    return (
      <div>
        <div className='py-5 text-center'>
          <p className='p-2'>loading...</p>
        </div>
        <div className='grid grid-cols-3 grid-rows-2'>
          {[...Array(6)].map((_, i) => {
            return <SkeletonCard key={i} />
          })}
        </div>
      </div>
    )
  if (isError) return <>Error loading theme</>
  return (
    <div>
      <div className='py-5 text-center'>
        <p className='p-2'>{theme?.title}</p>
      </div>
      <Pictures comments={comments} likes={likes} pictures={theme?.pictures} user={user} />
    </div>
  )
})

export default ThemeLayout
ThemeLayout.displayName = 'ThemeLayout'
