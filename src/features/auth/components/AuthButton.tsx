'use client'

import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Login } from './Login'
import { Logout } from './Logout'
import { Skeleton } from '@/components/ui/skeleton'

export const AuthButton = () => {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return (
      <main className='flex flex-col items-center justify-between'>
        <Skeleton className='w-[240px] h-[40px]' />
      </main>
    )
  }
  if (session) {
    return (
      <>
        <div className='flex gap-4 items-end'>
          <Image src={session.user.image ?? '/avatar.png'} width={70} height={70} alt='avatar' />
          <p className='pb-2'>{session.user.name} さん</p>
        </div>
        <Logout />
      </>
    )
  }

  return <Login />
}
