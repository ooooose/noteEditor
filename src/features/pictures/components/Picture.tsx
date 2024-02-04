import * as React from 'react'
import { Card } from '@/components/elements/Card/Card'
import Image from 'next/image'

type PictureProps = {
  src: string
  author: string
}

export const Picture = ({ src, author }: PictureProps) => {
  return (
    <>
      <Card title={author}>
        <Image src={src} width={200} height={150} alt={author} />
      </Card>
    </>
  )
}
