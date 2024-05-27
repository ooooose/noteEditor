'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import Pictures from '@/features/pictures/components/Pictures'

import { useFetchUserPictures } from '../hooks/useFetchUserPictures'

import Profile from './Profile'

const UserPictures = () => {
  const { user, isLoading: isUserLoading } = useFetchAuthUserByEmail()
  const {
    pictures,
    isLoading: isPicturesLoading,
    error,
    size,
    isLast,
    loadMorePictures,
  } = useFetchUserPictures(user?.id)

  const isLoading = isPicturesLoading || isUserLoading
  if (error) return <>Error loading theme</>
  const height = `h-[${size * 600}px] mt-5`
  return (
    <div>
      <Profile isLoading={isLoading} user={user} />
      <Tabs className='mt-5 w-[760px]' defaultValue='works'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='works'>Works</TabsTrigger>
          <TabsTrigger value='likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent value='works'>
          <div className={height}>
            <Pictures
              isLast={isLast}
              isLoading={isLoading}
              loadMorePictures={loadMorePictures}
              pictures={pictures}
              user={user}
            />
          </div>
        </TabsContent>
        <TabsContent className='w-full' value='likes'>
          <div className='mx-auto text-center'>絵画表示予定</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default UserPictures
