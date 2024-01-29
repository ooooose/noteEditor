import React from 'react'
import Link from 'next/link'
import { HeaderRight } from './HeaderRight'

const Header = () => {
  return (
    <div className='py-8 px-3 sm:px-10 text-4xl flex items-center justify-between'>
      <div className='font-medium'>
        <Link href='/'>画HACK</Link>
      </div>
      <HeaderRight />
    </div>
  )
}

export default Header
