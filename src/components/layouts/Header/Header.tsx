import React from 'react'
import { AuthButton } from '@/features/auth/components/AuthButton'

const Header = () => {
  return (
    <div className='py-8 px-10 text-4xl flex items-center justify-between'>
      <div className='font-medium'>Tipser</div>
      <AuthButton />
    </div>
  )
}

export default Header
