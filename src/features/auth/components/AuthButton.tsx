'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { Login } from './Login'
import { Logout } from './Logout'

export const AuthButton = () => {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return (
      <main className='flex flex-col items-center justify-between'>
        <Skeleton className='h-[40px] w-[240px]' />
      </main>
    )
  }
  if (session) {
    return (
      <>
        <div className='flex items-end gap-4'>
          <Image
            alt='avatar'
            className='rounded-full'
            height={70}
            src={session.user.image ?? '/avatar.png'}
            width={70}
          />
          <p className='pb-2'>{session.user.name} さん</p>
        </div>
        <Logout />
      </>
    )
  }

  return <Login />
}
