'use client'

import React from 'react'
import Link from 'next/link'
import { Picture as PictureType } from '../types'
import { Picture } from './Picture'
import { usePathname } from 'next/navigation'
import { Like } from '@/features/likes/components'
import { useMutateLike } from '@/features/likes/hooks/useMutateLike'
import { Comment } from '@/features/comments/components/Comment'

type PictureCardProps = {
  picture: PictureType
}

export const PictureCard = React.memo(({ picture }: PictureCardProps) => {
  const { like, liked, likeCount, isLoading: isLikeLoading } = useMutateLike(picture.id)
  const pathName = usePathname()
  const isDisabled = pathName === `/pictures/${picture.id}`
  return (
    <div className='w-[250px] h-[300px]'>
      <div className='py-3'>
        <div>
          <span className='font-bold'>{picture.author}</span>さん
        </div>
      </div>
      <div>
        <div className='relative'>
          <a href={`/pictures/${picture.id}`} className={isDisabled ? 'pointer-events-none' : ''}>
            <Picture src={picture.image} author={picture.author} frameId={picture.frameId} />
          </a>
        </div>
        <div className='float-right mt-3 flex gap-2'>
          <Comment pictureId={picture.id} />
          <Like like={like} liked={liked} likeCount={likeCount} isLoading={isLikeLoading} />
        </div>
      </div>
    </div>
  )
})

PictureCard.displayName = 'PictureCard'
