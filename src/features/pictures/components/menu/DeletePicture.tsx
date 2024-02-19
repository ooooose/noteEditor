import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

import { Button } from '@/components/elements/Button'
import { Tooltip } from '@/components/elements/Tooltip/Tooltip'
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

export const DeletePicture = React.memo(({ pictureId, image }: DeletePictureProps) => {
  const { handleDeletePicture } = useDeletePicture()
  return (
    <Dialog>
      <Tooltip content='絵を削除する'>
        <DialogTrigger className='p-2'>
          <FaRegTrashAlt color='red' size={24} />
        </DialogTrigger>
      </Tooltip>
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
      </DialogContent>
    </Dialog>
  )
})

DeletePicture.displayName = 'DeletePicture'
