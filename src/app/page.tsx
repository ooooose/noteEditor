'use client'

import Image from 'next/image'

import MainLayout from '@/components/layouts/Layout/MainLayout'

export default function Home() {
  return (
    <>
      <MainLayout>
        <main className='flex w-[700px] flex-col items-center justify-between'>
          <div className='mt-20'>
            <Image
              alt='Top Image'
              className='h-[200px] w-auto'
              height={100}
              priority
              src='/TopImage.png'
              width={100}
            />
          </div>
          <div className='my-10 text-center'>
            <p>画HACKはお題に沿って絵を描き、投稿するアプリです。</p>
          </div>
        </main>
      </MainLayout>
    </>
  )
}
