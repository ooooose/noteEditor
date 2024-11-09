'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import LoadingPictures from '@/features/pictures/components/LoadingPictures'

import { useProfile, useInfiniteUserPictures, useInfiniteUserLikedPictures } from '../api'

import LikedPictures from './LikedPictures'
import Profile from './Profile'
import UserPictures from './UserPictures'

const User = () => {
  const useProfilequery = useProfile({})
  const useUserPicturesQuery = useInfiniteUserPictures({ userUid: useProfilequery.data?.uid ?? '' })
  const useUserLikedPicturesQuery = useInfiniteUserLikedPictures({
    userUid: useProfilequery.data?.uid ?? '',
  })

  const userPictures = useUserPicturesQuery.data?.pages.flatMap((page) => page.data)
  const userLikedPictures = useUserLikedPicturesQuery.data?.pages.flatMap((page) => page.data)
  if (useProfilequery.isError) return <>Error loading</>
  return (
    <div>
      <Profile isLoading={useProfilequery.isLoading} user={useProfilequery?.data} />
      <Tabs className='mt-5 w-[900px]' defaultValue='works'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='works'>Works</TabsTrigger>
          <TabsTrigger value='likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent className='mt-5' value='works'>
          {useUserPicturesQuery.isLoading ? (
            <LoadingPictures />
          ) : (
            <div className='mt-10'>
              <UserPictures pictures={userPictures ?? []} />
              {useUserPicturesQuery.hasNextPage && (
                <div className='flex items-center justify-center py-8'>
                  <Button onClick={() => useUserPicturesQuery.fetchNextPage()} variant='outline'>
                    {useUserPicturesQuery.isFetchingNextPage ? <Spinner /> : 'さらに読み込む'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent className='mt-5 w-full' value='likes'>
          {useUserLikedPicturesQuery.isLoading ? (
            <LoadingPictures />
          ) : (
            <div className='mt-10'>
              <LikedPictures likedPictures={userLikedPictures ?? []} />
              {useUserLikedPicturesQuery.hasNextPage && (
                <div className='flex items-center justify-center py-8'>
                  <Button
                    onClick={() => useUserLikedPicturesQuery.fetchNextPage()}
                    variant='outline'
                  >
                    {useUserLikedPicturesQuery.isFetchingNextPage ? <Spinner /> : 'さらに読み込む'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default User
