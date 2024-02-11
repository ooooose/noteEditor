import * as React from 'react'
import Image from 'next/image'

type PictureProps = {
  src: string
  author: string
  pictureId: string
}

export const Picture = ({ src, author, pictureId }: PictureProps) => {
  return (
    <>
      <Image
        src={src}
        className='mx-auto border'
        width={200}
        height={150}
        style={{ width: '80%', height: 'auto' }}
        alt={author}
        priority
      />
    </>
  )
}
