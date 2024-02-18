import React from 'react'

import { Card } from '@/components/elements/Card/Card'

import { TopPicture } from './TopPicture'

type ThemeProps = {
  title: string
  themeId: string
}

export const Theme = ({ title, themeId }: ThemeProps) => {
  return (
    <>
      <Card title={title}>
        <div className='relative'>
          <TopPicture themeId={themeId} />
        </div>
      </Card>
    </>
  )
}
