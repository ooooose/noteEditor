'use client'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import LoadingPictures from '@/features/pictures/components/LoadingPictures'
import { NoPictures } from '@/features/pictures/components/NoPictures'
import Pictures from '@/features/pictures/components/Pictures'
import { useFetchPictures } from '@/features/pictures/hooks/useFetchPictures'

const UserPictures = () => {
  const {
    pictures,
    isLoading: isPicturesLoading,
    error,
    size,
    isLast,
    loadMorePictures,
  } = useFetchPictures()
  const { user, isLoading: isUserLoading } = useFetchAuthUserByEmail()

  const sortedPictures = pictures?.filter((picture) => picture.userId === user?.id) ?? null
  const isLoading = isPicturesLoading || isUserLoading
  if (isLoading) return <LoadingPictures />
  if (error) return <>Error loading theme</>
  if (sortedPictures?.length === 0) return <NoPictures />
  const height = `h-[${size * 600}px] mt-5`
  return (
    <div className={height}>
      <Pictures
        isLast={isLast}
        loadMorePictures={loadMorePictures}
        pictures={sortedPictures}
        user={user}
      />
    </div>
  )
}
export default UserPictures
