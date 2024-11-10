import { memo } from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import LoadingPictures from '@/features/pictures/components/LoadingPictures'
import Pictures from '@/features/pictures/components/Pictures'

import { useInfiniteUserPictures } from '../api'

type LikedPicturesProps = {
  userUid: string
}

const UserPictures = memo(({ userUid }: LikedPicturesProps) => {
  const useUserPicturesQuery = useInfiniteUserPictures({
    userUid: userUid,
  })

  const userPictures = useUserPicturesQuery.data?.pages.flatMap((page) => page.data)

  if (useUserPicturesQuery.isLoading) return <LoadingPictures />
  return (
    <div className='mt-10'>
      <Pictures pictures={userPictures ?? []} />
      {useUserPicturesQuery.hasNextPage && (
        <div className='flex items-center justify-center py-8'>
          <Button onClick={() => useUserPicturesQuery.fetchNextPage()} variant='outline'>
            {useUserPicturesQuery.isFetchingNextPage ? <Spinner /> : 'さらに読み込む'}
          </Button>
        </div>
      )}
    </div>
  )
})

export default UserPictures
UserPictures.displayName = 'UserPictures'
