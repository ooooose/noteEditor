import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

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

const DeletePicture = React.memo(({ pictureId, image }: DeletePictureProps) => {
  const { handleDeletePicture } = useDeletePicture()
  return (
    <Dialog>
      <Tooltip content='絵を削除'>
        <DialogTrigger className='p-2'>
          <TrashIcon className='size-6' color='red' />
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

export default DeletePicture
DeletePicture.displayName = 'DeletePicture'
