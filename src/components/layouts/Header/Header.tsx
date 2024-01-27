'use client'

import React from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/elements/Navigation/Navigation'
import { useSession } from 'next-auth/react'
import { Login } from '@/features/auth/components/Login'

const Header = () => {
  const { status } = useSession()
  return (
    <div className='py-8 px-3 sm:px-10 text-4xl flex items-center justify-between'>
      <div className='font-medium'>
        <Link href='/'>画HACK</Link>
      </div>
      <div className='flex gap-2'>{status === 'authenticated' ? <Navigation /> : <Login />}</div>
    </div>
  )
}

export default Header
