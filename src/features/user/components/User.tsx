'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import LoadingPictures from '@/features/pictures/components/LoadingPictures'

import { useProfile } from '../api'

import LikedPictures from './LikedPictures'
import Profile from './Profile'
import UserPictures from './UserPictures'

const User = () => {
  const useProfilequery = useProfile({})

  if (useProfilequery.isError) return <>Error loading</>
  return (
    <div className='mx-auto w-full px-4 md:w-[960px]'>
      <Profile isLoading={useProfilequery.isLoading} user={useProfilequery?.data} />
      <Tabs className='mt-5 w-full' defaultValue='works'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='works'>Works</TabsTrigger>
          <TabsTrigger value='likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent className='mt-5' value='works'>
          {useProfilequery.isLoading ? (
            <LoadingPictures />
          ) : (
            <UserPictures userUid={useProfilequery.data?.uid ?? ''} />
          )}
        </TabsContent>
        <TabsContent className='mt-5 w-full' value='likes'>
          {useProfilequery.isLoading ? (
            <LoadingPictures />
          ) : (
            <LikedPictures userUid={useProfilequery.data?.uid ?? ''} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default User
