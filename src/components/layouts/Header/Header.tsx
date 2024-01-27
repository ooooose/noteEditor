import React from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/elements/Navigation/Navigation'

const Header = () => {
  return (
    <div className='py-8 px-3 sm:px-10 text-4xl flex items-center justify-between'>
      <div className='font-medium'>
        <Link href='/'>画HACK</Link>
      </div>
      <div className='flex gap-2'>
        <Navigation />
      </div>
    </div>
  )
}

export default Header
