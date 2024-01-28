import React from 'react'
import { Themes } from './Themes'

export const Layout = () => {
  return (
    <div>
      <div className='text-center py-5'>
        <p className='p-2'>テーマ一覧</p>
      </div>
      <Themes />
    </div>
  )
}
