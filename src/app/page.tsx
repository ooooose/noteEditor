import React from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'

export default function Home() {
  return (
    <>
      <MainLayout>
        <main className='flex flex-col items-center justify-between'>
          <div className='my-20'>ここにImageを持ってくる。</div>
          <div className='my-10'>
            <p>Tipserは、あなたの持っているTipsを共有するアプリです。</p>
          </div>
        </main>
      </MainLayout>
    </>
  )
}
