import Script from 'next/script'
import React from 'react'

import { Picture as PictureType } from '../types'

import { PictureCard } from './PictureCard'

type PicutresProps = {
  pictures: PictureType[]
}

export const Pictures = React.memo(({ pictures }: PicutresProps) => {
  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-10'>
      {pictures?.map((picture: PictureType) => {
        return <PictureCard key={picture.id} picture={picture} />
      })}
      <Script src={process.env.BUCKET_URL} />
    </div>
  )
})

Pictures.displayName = 'Pictures'
