import { memo } from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import LoadingPictures from '@/features/pictures/components/LoadingPictures'
import Pictures from '@/features/pictures/components/Pictures'

import { useInfiniteUserLikedPictures } from '../api'

type LikedPicturesProps = {
  userUid: string
}

const LikedPictures = memo(({ userUid }: LikedPicturesProps) => {
  const useUserLikedPicturesQuery = useInfiniteUserLikedPictures({
    userUid: userUid,
  })
  const userLikedPictures = useUserLikedPicturesQuery.data?.pages.flatMap((page) => page.data)

  if (useUserLikedPicturesQuery.isLoading) return <LoadingPictures />
  return (
    <div className='mt-10'>
      <Pictures pictures={userLikedPictures ?? []} />
      {useUserLikedPicturesQuery.hasNextPage && (
        <div className='flex items-center justify-center py-8'>
          <Button onClick={() => useUserLikedPicturesQuery.fetchNextPage()} variant='outline'>
            {useUserLikedPicturesQuery.isFetchingNextPage ? <Spinner /> : 'さらに読み込む'}
          </Button>
        </div>
      )}
    </div>
  )
})

export default LikedPictures
LikedPictures.displayName = 'LikedPictures'
