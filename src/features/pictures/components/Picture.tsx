import Image from 'next/image'
import { memo } from 'react'

import { Frames } from './Frames'

type PictureProps = {
  src: string
  author: string
  frameId: number
}

export const Picture = memo(({ src, author, frameId }: PictureProps) => {
  return (
    <>
      <Frames frameId={frameId}>
        <div>
          <Image
            alt={author}
            className='absolute z-10 border bg-white'
            decoding='async'
            fetchPriority='high'
            height={120}
            priority
            quality={50}
            src={src}
            width={150}
          />
        </div>
      </Frames>
    </>
  )
})

Picture.displayName = 'Picture'
