'use client'

import React from 'react'
import { useFetchPictureById } from '../hooks/useFetchPictureById'
import { Picture } from './Picture'
import { Card } from '@/components/elements/Card/Card'
import { Like } from '@/features/likes/components'
import { SkeletonCard } from '@/components/elements/Skeleton/SkeletonCard'

type PictureLayoutProps = {
  id: string
}

export const PictureLayout = ({ id }: PictureLayoutProps) => {
  const { picture, isError, isLoading } = useFetchPictureById(id)
  if (isLoading)
    return (
      <div>
        <div className='text-center py-5'>
          <p className='p-2'>loading...</p>
        </div>
        <div className='flex flex-wrap gap-x-3 gap-y-5'>
          <SkeletonCard />
        </div>
      </div>
    )
  if (isError) return <>Error loading theme</>
  return (
    <div>
      <div className='text-center py-5'>
        <p className='p-2'>{picture.theme.title}</p>
      </div>
      <Card title={picture.author}>
        <Picture src={picture.image} author={picture.author} pictureId={picture.id} />
        <div className='float-right mt-3'>
          <Like pictureId={picture.id} />
          <p className='text-xs mt-1'>5 いいね</p>
        </div>
      </Card>
    </div>
  )
}
