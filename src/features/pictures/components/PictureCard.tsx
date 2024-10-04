import { usePathname } from 'next/navigation'
import { memo } from 'react'

import Comment from '@/features/comments/components/Comment'
import { Like } from '@/features/likes/components'
import { useMutateLike } from '@/features/likes/hooks/useMutateLike'
import { Like as LikeType } from '@/features/likes/types'
import { formatDateForPicture } from '@/utils/format'

import { Picture } from './Picture'
import PictureMenu from './PictureMenu'
import PictureTheme from './PictureTheme'

import type { Picture as PictureType } from '../types'
import type { User } from '@/features/user/types'

type PictureCardProps = {
  picture: PictureType
  likes: LikeType[]
  user: User
}

const PictureCard = memo(({ picture, user, likes }: PictureCardProps) => {
  const { like, liked, likeCount } = useMutateLike(picture.id, user.id, likes)
  const pathName = usePathname()
  const isDisplay = pathName === '/timeline'
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
            {isDisplay && (
              <PictureTheme
                author={picture.user.name}
                frameId={picture.frameId}
                src={picture.image}
                title={picture.theme?.title}
              />
            )}
          </div>
          <div className='mt-3 flex gap-2'>
            <Comment pictureId={picture.id} user={user} />
            <Like like={like} likeCount={likeCount} liked={liked} />
          </div>
          {user.id === picture.userId && <PictureMenu picture={picture} />}
        </div>
      </div>
    </div>
  )
})

export default PictureCard
PictureCard.displayName = 'PictureCard'
