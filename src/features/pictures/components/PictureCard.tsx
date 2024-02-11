'use client'

import React from 'react'
import Link from 'next/link'
import { Picture as PictureType } from '../types'
import { Picture } from './Picture'
import { Card } from '@/components/elements/Card/Card'
import { Like } from '@/features/likes/components'
import { useMutateLike } from '@/features/likes/hooks/useMutateLike'

type PictureCardProps = {
  picture: PictureType
}

export const PictureCard = ({ picture }: PictureCardProps) => {
  const { like, liked, likeCount, isLoading: isLikeLoading } = useMutateLike(picture.id)
  return (
    <Card key={picture.id} title={picture.author}>
      <a href={`/pictures/${picture.id}`}>
        <Picture src={picture.image} author={picture.author} pictureId={picture.id} />
      </a>
      <div className='float-right mt-3'>
        <Like
          pictureId={picture.id}
          like={like}
          liked={liked}
          likeCount={likeCount}
          isLoading={isLikeLoading}
        />
      </div>
    </Card>
  )
}
