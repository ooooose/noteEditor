import * as React from 'react'
import Image from 'next/image'
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
          src={src}
          className='absolute z-10 bg-white mx-auto -mt-3 -ml-2 border'
          width={200}
          height={150}
          alt={author}
          style={{ maxWidth: '110%' }}
          priority
        />
      </div>
    </Frames>
  )
})

Picture.displayName = 'Picture'
