'use client'

import React from 'react'
import { useFetchPictureById } from '../hooks/useFetchPictureById'
import { Picture } from './Picture'
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
      <Picture src={picture.image} author={picture.author} />
    </div>
  )
}