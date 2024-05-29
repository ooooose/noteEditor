import { memo } from 'react'

import Pictures from '@/features/pictures/components/Pictures'

import { useFetchUserLikedPictures } from '../hooks/useFetchUserLikedPictures'

import type { AuthUser } from '@/features/auth/types'

type LikedPicturesProps = {
  user: AuthUser
}

const LikedPictures = memo(({ user }: LikedPicturesProps) => {
  const {
    pictures,
    isLoading: isPicturesLoading,
    error,
    size,
    isLast,
    loadMorePictures,
  } = useFetchUserLikedPictures(user.id)

  const isLoading = isPicturesLoading
  if (error) return <>Error loading theme</>
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
})

export default LikedPictures
LikedPictures.displayName = 'LikedPictures'
