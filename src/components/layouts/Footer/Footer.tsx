import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-36 border-0 border-t border-solid bg-gray-50 py-6 text-gray-500'>
      <div className='mx-auto w-2/3 max-w-full px-4'>
        <div className='flex flex-col gap-8 pb-12 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-col items-center gap-4 sm:items-start'>
            <div className='mt-10 text-center sm:text-left'>
              <div className='flex items-center justify-center gap-2 sm:justify-start'>
                <Link href='/'>
                  <span className='text-4xl font-bold'>
                    <span className='text-red-500'>画</span>
                    <span className='text-gray-900'>H</span>
                    <span className='text-yellow-500'>A</span>
                    <span className='text-green-500'>C</span>
                    <span className='text-blue-500'>K</span>
                  </span>
                </Link>
              </div>
              <p className='mt-2 whitespace-nowrap'>テーマに沿って絵を描くアプリ</p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-y-3 pt-2 sm:items-end sm:pt-7'>
            <Link href='/'>アプリについて</Link>
            <Link href='/terms?tab=terms'>規約とポリシー</Link>
          </div>
        </div>
        <p className='mb-2 mt-10 text-center'>
          All right reserved by
          <a
            className='ml-2 border-b border-dotted border-blue-500'
            href='https://twitter.com/ooooonse0524'
            rel='noopener noreferrer'
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
