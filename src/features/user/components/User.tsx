'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import LoadingPictures from '@/features/pictures/components/LoadingPictures'

import { useUser } from '../api'

import LikedPictures from './LikedPictures'
import Profile from './Profile'
import UserPictures from './UserPictures'

const User = () => {
  const useUserquery = useUser({})
  if (useUserquery.isError) return <>Error loading theme</>
  return (
    <div>
      <Profile isLoading={useUserquery.isLoading} user={useUserquery?.data} />
      <Tabs className='mt-5 w-[760px]' defaultValue='works'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='works'>Works</TabsTrigger>
          <TabsTrigger value='likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent value='works'>
          {useUserquery.isLoading ? (
            <LoadingPictures />
          ) : (
            <UserPictures pictures={useUserquery.data?.pictures} />
          )}
        </TabsContent>
        <TabsContent className='w-full' value='likes'>
          {useUserquery.isLoading ? (
            <LoadingPictures />
          ) : (
            <LikedPictures likedPictures={useUserquery.data?.likedPictures} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default User
