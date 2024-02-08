import React from 'react'
import Link from 'next/link'
import { Picture as PictureType } from '../types'
import { Picture } from './Picture'
import { Card } from '@/components/elements/Card/Card'
import { Like } from '@/features/likes/components'

type PicutresProps = {
  pictures: PictureType[]
}

export const Pictures = ({ pictures }: PicutresProps) => {
  return (
    <div className='flex flex-wrap gap-x-3 gap-y-5'>
      {pictures?.map((picture: PictureType) => {
        return (
          <Card key={picture.id} title={picture.author}>
            <Link href={`/pictures/${picture.id}`}>
              <Picture src={picture.image} author={picture.author} pictureId={picture.id} />
            </Link>
            <div className='float-right mt-3'>
              <Like pictureId={picture.id} />
              <p className='text-xs mt-1'>5 いいね</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
