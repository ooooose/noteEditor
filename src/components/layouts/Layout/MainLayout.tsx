import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Toaster } from '@/components/ui/sonner'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='select-none'>
      <div className='md:w-2/3 w-full mx-auto'>
        <Header />
        <div className='flex flex-col items-center justify-between h-screen'>{children}</div>
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default MainLayout
