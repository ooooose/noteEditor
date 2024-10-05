import { memo } from 'react'

import { formatDateForPicture } from '@/utils/format'

import { Picture } from './Picture'
import PictureTheme from './PictureTheme'

import type { Picture as PictureType } from '../types'

type PictureCardProps = {
  picture: PictureType
}

const PictureCard = memo(({ picture }: PictureCardProps) => {
  return (
    <div className='h-[300px] w-[250px]'>
      <div className='py-3'>
        <div className='mx-3 flex justify-between'>
          <p>
            <span className='font-bold'>{picture.user.name}</span>さん
          </p>
          <p className='text-sm font-semibold opacity-50'>
            {formatDateForPicture(picture.createdAt)}
          </p>
        </div>
      </div>
      <div>
        <Picture author={picture.user.name} frameId={picture.frameId} src={picture.image} />
        <div className='float-right flex gap-2'>
          <div className='ml-2 mt-3'>
            <PictureTheme
              author={picture.user.name}
              frameId={picture.frameId}
              src={picture.image}
              title={picture.theme?.title}
            />
          </div>
          {/* <div className='mt-3 flex gap-2'>
            <Comment pictureId={picture.id} user={user} />
          </div> */}
        </div>
      </div>
    </div>
  )
})

export default PictureCard
PictureCard.displayName = 'PictureCard'
