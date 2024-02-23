import React from 'react'

import { CreateThemeModal } from './CreateThemeModal'
import { Themes } from './Themes'

const ThemesLayout = () => {
  return (
    <div>
      <div className='px-3 py-5 text-center sm:px-10'>
        <p className='p-2'>テーマ一覧</p>
        <div className='text-right'>
          <CreateThemeModal />
        </div>
      </div>
      <Themes />
    </div>
  )
}

export default ThemesLayout
