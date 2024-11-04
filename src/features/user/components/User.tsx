'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import LoadingPictures from '@/features/pictures/components/LoadingPictures'

import { useProfile, useUserPictures, useUserLikedPictures } from '../api'

import LikedPictures from './LikedPictures'
import Profile from './Profile'
import UserPictures from './UserPictures'

const User = () => {
  const useProfilequery = useProfile({})
  const useUserPicturesQuery = useUserPictures({ userUid: useProfilequery.data?.uid ?? '' })
  const useUserLikedPicturesQuery = useUserLikedPictures({
    userUid: useProfilequery.data?.uid ?? '',
  })

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
            <UserPictures pictures={useUserPicturesQuery.data ?? []} />
          )}
        </TabsContent>
        <TabsContent className='mt-5 w-full' value='likes'>
          {useUserLikedPicturesQuery.isLoading ? (
            <LoadingPictures />
          ) : (
            <LikedPictures likedPictures={useUserLikedPicturesQuery.data ?? []} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default User
