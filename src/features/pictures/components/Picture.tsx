import Image from 'next/image'
import React from 'react'

import { Frames } from './Frames'

type PictureProps = {
  src: string
  author: string
  frameId: number
}

export const Picture = React.memo(({ src, author, frameId }: PictureProps) => {
  return (
    <Frames frameId={frameId}>
      <div>
        <Image
          alt={author}
          className='absolute z-10 mx-auto -ml-2 -mt-3 border bg-white'
          height={150}
          priority
          quality={50}
          src={src}
          style={{ maxWidth: '110%' }}
          width={200}
        />
      </div>
    </Frames>
  )
})

Picture.displayName = 'Picture'
