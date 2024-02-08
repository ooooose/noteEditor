'use client'

import React from 'react'
import { LikeButton, UnlikeButton } from '.'
import { useSession } from 'next-auth/react'
import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { Like as LikeType } from '../types'

type LikeProps = {
  pictureId: string
}

export const Like = ({ pictureId }: LikeProps) => {
  const { data: session } = useSession()
  const { user: authUser } = useFetchAuthUserByEmail(session?.user.email ?? '')
  const isLike = authUser && authUser.likes.find((like: LikeType) => like.pictureId === pictureId)

  return (
    <div className='flex gap-3'>
      {isLike ? <UnlikeButton pictureId={pictureId} /> : <LikeButton pictureId={pictureId} />}
    </div>
  )
}
