import Image from 'next/image'

import MainLayout from '@/components/layouts/Layout/MainLayout'

export default function Home() {
  return (
    <>
      <MainLayout>
        <main className='flex w-[400px] flex-col items-center justify-between bg-blue-300/50'>
          <div className='my-20'>
            <Image
              alt='Top Image'
              className='h-[200px] w-auto'
              height={100}
              src='/TopImage.png'
              width={100}
            />
          </div>
          <div className='my-10'>
            <p>お題に沿った絵を描き、投稿するアプリ</p>
          </div>
        </main>
      </MainLayout>
    </>
  )
}
