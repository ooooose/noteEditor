'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Menu from '@/components/elements/Menu/Menu'

const Header = () => {
  return (
    <header className='mx-auto w-full border-b border-white/40 bg-white/60 backdrop-blur-sm'>
      <div className='flex h-16 items-center justify-between sm:h-20'>
        <div className='flex items-center gap-2'>
          <Image
            alt='Main Character'
            height={40}
            loading='eager'
            sizes='40px'
            src='/main-character.png'
            width={40}
          />
          <Link href='/'>
            <span className='text-3xl font-bold tracking-tight sm:text-4xl'>
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
