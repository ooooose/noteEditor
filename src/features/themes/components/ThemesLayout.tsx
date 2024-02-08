import React from 'react'
import { Themes } from './Themes'
import { CreateThemeModal } from './CreateThemeModal'

export const ThemesLayout = () => {
  return (
    <div>
      <div className='text-center py-5 px-3 sm:px-10'>
        <p className='p-2'>テーマ一覧</p>
        <div className='text-right'>
          <CreateThemeModal />
        </div>
      </div>
      <Themes />
    </div>
  )
}
