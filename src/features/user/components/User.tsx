'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import LoadingPictures from '@/features/pictures/components/LoadingPictures'

import { useProfile } from '../api'

import LikedPictures from './LikedPictures'
import Profile from './Profile'
import UserPictures from './UserPictures'

const User = () => {
  const useProfilequery = useProfile({})
  if (useProfilequery.isError) return <>Error loading theme</>
  return (
    <div>
      <Profile isLoading={useProfilequery.isLoading} user={useProfilequery?.data} />
      <Tabs className='mt-5 w-[760px]' defaultValue='works'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='works'>Works</TabsTrigger>
          <TabsTrigger value='likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent value='works'>
          {useProfilequery.isLoading ? (
            <LoadingPictures />
          ) : (
            <UserPictures pictures={useProfilequery.data?.pictures} />
          )}
        </TabsContent>
        <TabsContent className='w-full' value='likes'>
          {useProfilequery.isLoading ? (
            <LoadingPictures />
          ) : (
            <LikedPictures likedPictures={useProfilequery.data?.likedPictures} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default User
