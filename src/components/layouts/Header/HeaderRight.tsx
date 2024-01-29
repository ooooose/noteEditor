'use client'

import React from 'react'
import { Navigation } from '@/components/elements/Navigation/Navigation'
import { useSession } from 'next-auth/react'
import { Login } from '@/features/auth/components/Login'
import { Skeleton } from '@/components/ui/skeleton'

export const HeaderRight = () => {
  const { status } = useSession()
  if (status === 'loading') return <Skeleton className='h-[40px] w-[80px]' />

  return <div>{status === 'authenticated' ? <Navigation /> : <Login />}</div>
}
