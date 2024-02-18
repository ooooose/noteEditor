import Link from 'next/link'
import React from 'react'

import Menu from '@/components/elements/Menu/Menu'

const Header = () => {
  return (
    <div className='sticky top-0 z-20 flex items-center justify-between bg-white bg-opacity-80 px-3 pb-4 pt-8 text-4xl sm:px-10'>
      <div className='font-medium'>
        <Link href='/'>画HACK</Link>
      </div>
      <Menu />
    </div>
  )
}

export default Header
