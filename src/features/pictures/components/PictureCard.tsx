import { AvatarImage, AvatarFallback, Avatar } from '@radix-ui/react-avatar'
import { memo } from 'react'

import { Card } from '@/components/ui/card'

import Comment from '@/features/comments/components/Comment'
import { Like } from '@/features/likes/components'
import { useMutateLike } from '@/features/likes/hooks/useMutateLike'
import { Like as LikeType } from '@/features/likes/types'
import { User } from '@/features/user/types'
import { formatDateForPicture } from '@/utils/format'

import { Picture as PictureType } from '../types'

import { Picture } from './Picture'
import PictureTheme from './PictureTheme'

type PictureCardProps = {
  picture: PictureType
  likes: LikeType[]
  user: User | undefined
}

const PictureCard = memo(({ picture, likes, user }: PictureCardProps) => {
  const { like, liked, likeCount } = useMutateLike(picture.uid, user?.id, likes, user?.uid)
  return (
    <div className='w-[300px]'>
      <Card
        className='group overflow-hidden bg-white/50 transition-shadow hover:shadow-lg'
        key={picture.id}
      >
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-10 rounded-full shadow-sm'>
                <AvatarImage className='size-10 rounded-full ' src={picture.user.image} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <div className='text-sm font-semibold'>{picture.user.name}さん</div>
                <p className='text-xs text-gray-500'>{formatDateForPicture(picture.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-4'>
          <div className='overflow-hidden'>
            <div className='bg-white px-4 pb-4'>
              <Picture
                author={picture.user.name}
                frameId={picture.frameId}
                src={picture.imageUrl}
              />
            </div>
          </div>
        </div>
        <div className='border-t bg-white p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-1'>
              <PictureTheme
                author={picture.user.name}
                frameId={picture.frameId}
                src={picture.imageUrl}
                title={picture.theme?.title}
              />
              <Like like={like} likeCount={likeCount} liked={liked} />
              <Comment pictureId={picture.id} user={user} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
})

export default PictureCard
PictureCard.displayName = 'PictureCard'
