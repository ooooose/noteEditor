import { TrashIcon } from '@radix-ui/react-icons'
import { memo } from 'react'

import { Button } from '@/components/elements/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import { useDeletePicture } from '../../hooks'

type DeletePictureProps = {
  pictureId: string
  image: string
}

const DeletePicture = memo(({ pictureId, image }: DeletePictureProps) => {
  const { handleDeletePicture } = useDeletePicture()
  return (
    <Dialog>
      <DialogTrigger>
        <TrashIcon className='size-6' color='red' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>この絵を削除しますか？</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button
            className='mt-3 w-full'
            onClick={() => handleDeletePicture(pictureId, image)}
            variant='destructive'
          >
            削除する
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className='w-full' variant='outline'>
            キャンセル
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
})

export default DeletePicture
DeletePicture.displayName = 'DeletePicture'
