import React from 'react'

import { Toaster } from '@/components/ui/sonner'

import Header from '../Header/Header'

type CanvasLayoutProps = {
  children: React.ReactNode
}

const CanvasLayout = ({ children }: CanvasLayoutProps) => {
  return (
    <div className='select-none'>
      <div className='mx-auto h-screen w-full  md:w-2/3'>
        <Header />
        <div className='flex flex-col items-center justify-between'>{children}</div>
      </div>
      <Toaster />
    </div>
  )
}

export default CanvasLayout
