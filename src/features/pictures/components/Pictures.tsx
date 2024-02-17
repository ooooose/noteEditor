'use client'

import React from 'react'
import Script from 'next/script'
import { Picture as PictureType } from '../types'
import { PictureCard } from './PictureCard'

type PicutresProps = {
  pictures: PictureType[]
}

export const Pictures = React.memo(({ pictures }: PicutresProps) => {
  return (
    <div className='gap-x-10 gap-y-10 grid grid-cols-3 grid-rows-2'>
      {pictures?.map((picture: PictureType) => {
        return <PictureCard key={picture.id} picture={picture} />
      })}
      <Script src={process.env.BUCKET_URL} />
    </div>
  )
})

Pictures.displayName = 'Pictures'
