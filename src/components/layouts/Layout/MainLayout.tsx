import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className='md:w-2/3 w-full mx-auto select-none'>
        <Header />
        <div className='flex flex-col items-center justify-between h-screen'>{children}</div>
      </div>
      <Footer />
    </>
  )
}

export default MainLayout
