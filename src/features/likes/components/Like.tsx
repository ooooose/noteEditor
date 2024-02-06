import React from 'react'

import { LikeButton, UnlikeButton } from '.'

export const Like = () => {
  return (
    <div className='flex gap-3'>
      <LikeButton />
      <UnlikeButton />
    </div>
  )
}
