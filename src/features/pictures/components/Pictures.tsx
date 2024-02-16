'use client'

import React from 'react'
import { Picture as PictureType } from '../types'
import { PictureCard } from './PictureCard'

type PicutresProps = {
  pictures: PictureType[]
}

export const Pictures = React.memo(({ pictures }: PicutresProps) => {
  return (
    <div className='gap-x-5 gap-y-5 grid grid-cols-3 grid-rows-2'>
      {pictures?.map((picture: PictureType) => {
        return <PictureCard key={picture.id} picture={picture} />
      })}
    </div>
  )
})

Pictures.displayName = 'Pictures'
