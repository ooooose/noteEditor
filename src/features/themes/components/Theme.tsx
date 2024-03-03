import { memo } from 'react'

import { Card } from '@/components/elements/Card/Card'

import { Picture } from '@/features/pictures/components/Picture'
import { Picture as PictureType } from '@/features/pictures/types'

type ThemeProps = {
  title: string
  pictures: PictureType[]
}

export const Theme = memo(({ title, pictures }: ThemeProps) => {
  if (pictures.length === 0)
    return (
      <Card title={title}>
        <div className='relative'>
          <div className='mx-auto h-[150px] w-[200px] bg-gray-100'>No Image</div>
        </div>
      </Card>
    )
  const topPicutre = pictures.reduce(
    (maxLikedPicture: PictureType, currentPicture: PictureType) => {
      return currentPicture.likes > maxLikedPicture.likes ? currentPicture : maxLikedPicture
    },
    pictures[0],
  )
  return (
    <Card title={title}>
      <div className='relative'>
        <Picture author={topPicutre.author} frameId={topPicutre.frameId} src={topPicutre.image} />
      </div>
    </Card>
  )
})

Theme.displayName = 'Theme'
