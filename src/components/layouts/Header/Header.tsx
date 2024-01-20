import React from 'react'
import { Button } from '../../ui/button'
import AuthModal from '../../elements/Modal/AuthModal'

const Header = () => {
  return (
    <div className='py-8 px-10 text-4xl flex items-center justify-between'>
      <div className='font-medium'>Tipser</div>
      <AuthModal />
    </div>
  )
}

export default Header
