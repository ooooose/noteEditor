'use client'

import Link from 'next/link'
import React from 'react'

import Menu from '@/components/elements/Menu/Menu'

const Header = () => {
  return (
    <header className='mx-auto bg-white/50 backdrop-blur-sm md:w-2/3'>
      <div className='container flex h-20 items-center md:justify-between'>
        <div className='flex items-center gap-2 '>
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
        <nav className='hidden gap-4 md:flex'>
          <Menu />
        </nav>
      </div>
    </header>
  )
}

export default Header
