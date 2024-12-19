'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

import { useTopUsers } from '../api'

import { LoadingUsers } from './loading-users'

export const TopUsers = () => {
  const useTopUsersQuery = useTopUsers({})
  if (useTopUsersQuery.isLoading) return <LoadingUsers />
  console.log(useTopUsersQuery.data)
  return (
    <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-3'>
      {useTopUsersQuery.data?.map((user, i) => (
        <div className='flex flex-col items-center p-4 text-center' key={i}>
          <h3 className='text-2xl font-semibold'>第{i + 1}位</h3>
          <Avatar className='my-2 rounded-full transition-shadow hover:shadow-lg'>
            <AvatarImage className='size-24 rounded-full' src={user.image} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <div className='text-xl'>{user.name} さん</div>
            <p className='text-sm text-gray-500'>{user.pictures.length} 作品</p>
          </div>
        </div>
      ))}
    </div>
  )
}
