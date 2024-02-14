'use client'

import React from 'react'
import { Picture as PictureType } from '../types'
import { PictureCard } from './PictureCard'

type PicutresProps = {
  pictures: PictureType[]
}

export const Pictures = React.memo(({ pictures }: PicutresProps) => {
  return (
    <div className='flex flex-wrap gap-x-5 gap-y-5'>
      {pictures?.map((picture: PictureType) => {
        return <PictureCard key={picture.id} picture={picture} />
      })}
    </div>
  )
})

Pictures.displayName = 'Pictures'
