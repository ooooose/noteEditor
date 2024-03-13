import React from 'react'

import { Toaster } from '@/components/ui/sonner'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='select-none'>
      <div className='mx-auto w-full md:w-2/3'>
        <Header />
        <div className='flex flex-col items-center justify-between'>{children}</div>
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default MainLayout
