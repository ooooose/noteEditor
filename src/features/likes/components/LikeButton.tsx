import { StarFilledIcon } from '@radix-ui/react-icons'
import { memo } from 'react'

type UnlikeButtonType = {
  like: () => void
  isLike: boolean
}

export const LikeButton = memo(({ like, isLike }: UnlikeButtonType) => {
  return (
    <div className='cursor-pointer rounded-full border p-3' onClick={like}>
      <StarFilledIcon className={isLike ? 'text-yellow-500' : ' text-gray-500 opacity-50'} />
    </div>
  )
})

LikeButton.displayName = 'LikeButton'
