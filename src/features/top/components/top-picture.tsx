import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

import { Card } from '@/components/ui/card'

import { Picture as PictureComponent } from '@/features/pictures/components/Picture'
import { Picture } from '@/features/pictures/types'
import { formatDateForPicture } from '@/utils/format'

type TopPictureProps = {
  picture: Picture
}

export const TopPicture = ({ picture }: TopPictureProps) => {
  return (
    <Card className='group mx-auto w-[80vw] max-w-[100vw] overflow-hidden bg-white/50 transition-shadow hover:shadow-lg sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='p-2 sm:p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-10 rounded-full shadow-sm'>
              <AvatarImage className='size-10 rounded-full' src={picture.user.image} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <div className='text-sm font-semibold'>{picture.user.name} さん</div>
              <p className='text-xs text-gray-500'>{formatDateForPicture(picture.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-1 sm:mx-4'>
        <div className='overflow-hidden'>
          <div className='w-full max-w-full bg-white pb-4'>
            <PictureComponent
              author={picture.user.name}
              frameId={picture.frameId}
              src={picture.imageUrl}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
