import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='py-8 px-10 text-4xl flex items-center justify-between'>
      <div className='font-medium'>
        <Link href='/'>Tipser</Link>
      </div>
    </div>
  )
}

export default Header
