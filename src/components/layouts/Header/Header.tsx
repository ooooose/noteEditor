import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React from 'react'

import Menu from '@/components/elements/Menu/Menu'

import AuthButton from '@/features/auth/components/AuthButton'

const Header = () => {
  const { status } = useSession()
  return (
    <header className='bg-white/50 backdrop-blur-sm'>
      <div className='container flex h-20 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <span className='text-4xl font-bold'>
              <span className='text-red-500'>画</span>
              <span className='text-gray-900'>H</span>
              <span className='text-yellow-500'>A</span>
              <span className='text-green-500'>C</span>
              <span className='text-blue-500'>K</span>
            </span>
          </Link>
        </div>
        <nav className='flex gap-4'>
          {/* <Button variant="ghost">
            <Link href="/" className='h-full'>アプリについて</Link>
          </Button> */}
          {status === 'authenticated' ? <Menu /> : <AuthButton />}
        </nav>
      </div>
    </header>
  )
}

export default Header
