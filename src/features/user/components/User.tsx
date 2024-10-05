// 'use client'

// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// // import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
// import LoadingPictures from '@/features/pictures/components/LoadingPictures'

// // import LikedPictures from './LikedPictures'
// import Profile from './Profile'
// import UserPictures from './UserPictures'

// const User = () => {
//   const { user, isError, isLoading: isUserLoading } = useFetchAuthUserByEmail()

//   const isLoading = isUserLoading

//   if (isError) return <>Error loading theme</>
//   return (
//     <div>
//       <Profile isLoading={isLoading} user={user} />
//       <Tabs className='mt-5 w-[760px]' defaultValue='works'>
//         <TabsList className='grid w-full grid-cols-2'>
//           <TabsTrigger value='works'>Works</TabsTrigger>
//           <TabsTrigger value='likes'>Likes</TabsTrigger>
//         </TabsList>
//         <TabsContent value='works'>
//           {isLoading ? <LoadingPictures /> : <UserPictures user={user} />}
//         </TabsContent>
//         {/* <TabsContent className='w-full' value='likes'>
//           <LikedPictures user={user} />
//         </TabsContent> */}
//       </Tabs>
//     </div>
//   )
// }
// export default User
