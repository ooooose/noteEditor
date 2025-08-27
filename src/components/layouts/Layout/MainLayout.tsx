import React from 'react'

import Menu from '@/components/elements/Menu/Menu'
import { Toaster } from '@/components/ui/sonner'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='select-none overflow-x-hidden'>
      <div className='mx-auto w-full'>
        <Header />
        <div className='flex flex-col items-center justify-between'>{children}</div>
        <nav className='fixed bottom-5 right-5 z-50 md:hidden'>
          <Menu />
        </nav>
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default MainLayout
