import { memo } from 'react'

import Pictures from '@/features/pictures/components/Pictures'

import type { Picture } from '@/features/pictures/types'

type LikedPicturesProps = {
  likedPictures: Picture[]
}

const LikedPictures = memo(({ likedPictures }: LikedPicturesProps) => {
  return <Pictures pictures={likedPictures} />
})

export default LikedPictures
LikedPictures.displayName = 'LikedPictures'
