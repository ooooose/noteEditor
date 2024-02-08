import React, { useState } from 'react'
import { LikeButton } from '.'

type LikeProps = {
  pictureId: string
}

export const Like = ({ pictureId }: LikeProps) => {
  return (
    <div className='flex gap-3'>
      <LikeButton pictureId={pictureId} />
    </div>
  )
}
