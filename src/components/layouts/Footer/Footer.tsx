import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-gray-50 border-t-m_gray-2 mt-0 border-0 border-t border-solid pt-6 pb-6 mt-12 text-gray-500'>
      <div className='w-3/4 mx-auto'>
        <div className='flex items-center justify-between px-4 pb-12'>
          <div className='ml-10'>
            <p className='text-3xl mb-3'>画HACK</p>
            <p>テーマに沿って絵を描くアプリ</p>
          </div>
          <div className='flex flex-col gap-y-3 pt-7'>
            <Link href='/'>アプリについて</Link>
            <Link href='/'>利用規約</Link>
            <Link href='/'>プライバシーポリシー</Link>
          </div>
        </div>
        <p className='text-center mt-10 mb-2'>
          All right reserved by
          <a
            href='https://twitter.com/ooooonse0524'
            className='ml-2 border-b border-dotted border-blue-500 border-t-1'
            target='_blank'
          >
            @ooooonse0524
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
