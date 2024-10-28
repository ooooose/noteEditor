import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

import type { User } from '../types'

type ProfileProps = {
  user: User | undefined
  isLoading: boolean
}

const Profile = ({ user, isLoading }: ProfileProps) => {
  if (isLoading)
    return (
      <div className='mx-auto flex flex-col gap-3'>
        <Skeleton className='mx-auto size-[70px] rounded-full' />
        <Skeleton className='mx-auto h-[40px] w-[140px] pb-2' />
      </div>
    )
  return (
    <div className='mx-auto flex flex-col gap-3'>
      <Image
        alt='avatar'
        className='mx-auto mb-5 size-[100px] rounded-full'
        height={100}
        src={user?.image ?? '/avatar.png'}
        width={100}
      />
      <p className='pb-2 text-center'>{user?.name} さん</p>
    </div>
  )
}

export default Profile
