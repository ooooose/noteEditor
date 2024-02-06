import { Button } from '@/components/ui/button'
import React from 'react'
import { FaRegHeart } from 'react-icons/fa'

export const LikeButton = () => {
  return (
    <div className='p-3 border rounded-full cursor-pointer'>
      <FaRegHeart />
    </div>
  )
}
