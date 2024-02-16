import React from 'react'
import { useDeletePicture } from '../../hooks'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/elements/Button'
import { Tooltip } from '@/components/elements/Tooltip/Tooltip'
import { FaRegTrashAlt } from 'react-icons/fa'

type DeletePictureProps = {
  pictureId: string
  image: string
}

export const DeletePicture = React.memo(({ pictureId, image }: DeletePictureProps) => {
  const { handleDeletePicture } = useDeletePicture()
  return (
    <Dialog>
      <Tooltip content='絵を削除する'>
        <DialogTrigger className='p-2'>
          <FaRegTrashAlt size={24} color='red' />
        </DialogTrigger>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>この絵を削除しますか？</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button
            onClick={() => handleDeletePicture(pictureId, image)}
            className='w-full mt-3'
            variant='destructive'
          >
            削除する
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
})

DeletePicture.displayName = 'DeletePicture'
