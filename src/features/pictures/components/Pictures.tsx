import React from 'react'
import Link from 'next/link'
import { Picture as PictureType } from '../types'
import { Picture } from './Picture'

type PicutresProps = {
  pictures: PictureType[]
}

export const Pictures = ({ pictures }: PicutresProps) => {
  return (
    <div className='flex flex-wrap gap-x-3 gap-y-5'>
      {pictures?.map((picture: PictureType) => {
        return (
          <Link key={picture.id} href={`/pictures/${picture.id}`}>
            <Picture src={picture.image} author={picture.author} pictureId={picture.id} />
          </Link>
        )
      })}
    </div>
  )
}
