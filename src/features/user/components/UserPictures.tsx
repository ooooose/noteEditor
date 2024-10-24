import { memo } from 'react'

import Pictures from '@/features/pictures/components/Pictures'

import type { Picture } from '@/features/pictures/types'

type LikedPicturesProps = {
  pictures: Picture[]
}

const UserPictures = memo(({ pictures }: LikedPicturesProps) => {
  return <Pictures pictures={pictures} />
})

export default UserPictures
UserPictures.displayName = 'UserPictures'
