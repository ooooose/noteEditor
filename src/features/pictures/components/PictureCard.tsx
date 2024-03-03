import { usePathname } from 'next/navigation'
import { memo } from 'react'

import { AuthUser } from '@/features/auth/types'
import Comment from '@/features/comments/components/Comment'
import { Comment as CommentType } from '@/features/comments/types'
import { Like } from '@/features/likes/components'
import { useMutateLike } from '@/features/likes/hooks/useMutateLike'
import { Like as LikeType } from '@/features/likes/types'
import { formatDateForPicture } from '@/utils/format'

import { Picture as PictureType } from '../types'

import { Picture } from './Picture'
import PictureMenu from './PictureMenu'
import PictureTheme from './PictureTheme'

type PictureCardProps = {
  picture: PictureType
  comments: CommentType[]
  likes: LikeType[]
  user: AuthUser
}

const PictureCard = memo(({ picture, comments, user, likes }: PictureCardProps) => {
  const { like, liked, likeCount } = useMutateLike(picture.id, user.id, likes)

  const pathName = usePathname()
  const isDisplay = pathName === '/timeline'
  return (
    <div className='h-[300px] w-[250px]'>
      <div className='py-3'>
        <div className='mx-3 flex justify-between'>
          <p>
            <span className='font-bold'>{picture.author}</span>さん
          </p>
          <p className='text-sm font-semibold opacity-50'>
            {formatDateForPicture(picture.createdAt)}
          </p>
        </div>
      </div>
      <div>
        <Picture author={picture.author} frameId={picture.frameId} src={picture.image} />
        <div className='float-right flex gap-2'>
          <div className='ml-2 mt-3'>
            {isDisplay && (
              <PictureTheme
                author={picture.author}
                frameId={picture.frameId}
                src={picture.image}
                title={picture.theme.title}
              />
            )}
          </div>
          <div className='mt-3 flex gap-2'>
            <Comment comments={comments} pictureId={picture.id} user={user} />
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
