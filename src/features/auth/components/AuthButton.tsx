'use client'

import { useSession } from 'next-auth/react'

import { Skeleton } from '@/components/ui/skeleton'

import { Login, Logout } from '.'

const AuthButton = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div>
      {loading ? (
        <Skeleton className='h-[36px] w-[140px]' />
      ) : session ? (
        <div className='flex h-full items-center justify-center gap-2'>
          <p className='text-center'>{session.user?.name} さん</p>
          <Logout />
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default AuthButton
