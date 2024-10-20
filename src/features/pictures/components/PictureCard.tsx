import { memo } from 'react'

import Comment from '@/features/comments/components/Comment'
import { Like } from '@/features/likes/components'
import { useMutateLike } from '@/features/likes/hooks/useMutateLike'
import { Like as LikeType } from '@/features/likes/types'
import { formatDateForPicture } from '@/utils/format'

import { Picture as PictureType } from '../types'

import { Picture } from './Picture'
import PictureTheme from './PictureTheme'

type PictureCardProps = {
  picture: PictureType
  likes: LikeType[]
}

const PictureCard = memo(({ picture, likes }: PictureCardProps) => {
  const { like, liked, likeCount } = useMutateLike(picture.uid, picture.userId, likes)
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
        <Picture author={picture.user.name} frameId={picture.frameId} src={picture.imageUrl} />
        <div className='float-right flex gap-2'>
          <div className='ml-2 mt-3'>
            <PictureTheme
              author={picture.user.name}
              frameId={picture.frameId}
              src={picture.imageUrl}
              title={picture.theme?.title}
            />
          </div>
          <div className='mt-3 flex gap-2'>
            <Like like={like} likeCount={likeCount} liked={liked} />
            <Comment pictureId={picture.id} user={picture.user} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default PictureCard
PictureCard.displayName = 'PictureCard'
