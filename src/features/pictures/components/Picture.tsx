import * as React from 'react'
import { Card } from '@/components/elements/Card/Card'
import Image from 'next/image'
import { Like } from '@/features/likes/components'

type PictureProps = {
  src: string
  author: string
  pictureId: string
}

export const Picture = ({ src, author, pictureId }: PictureProps) => {
  return (
    <>
      <Card title={`${author}さん`}>
        <Image
          src={src}
          className='mx-auto border'
          width={200}
          height={150}
          style={{ width: '80%', height: 'auto' }}
          alt={author}
          priority
        />
        <Like pictureId={pictureId} />
      </Card>
    </>
  )
}
