import React from 'react'
import Link from 'next/link'
import Menu from '@/components/elements/Menu/Menu'

const Header = () => {
  return (
    <div className='pt-8 pb-4 px-3 sm:px-10 text-4xl flex items-center justify-between sticky top-0 bg-white z-20 bg-opacity-80'>
      <div className='font-medium'>
        <Link href='/'>画HACK</Link>
      </div>
      <Menu />
    </div>
  )
}

export default Header
