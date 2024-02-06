import React from 'react'
import { FaHeart } from 'react-icons/fa'

export const UnlikeButton = () => {
  return (
    <div className='p-3 border rounded-full cursor-pointer '>
      <FaHeart color='red' />
    </div>
  )
}
