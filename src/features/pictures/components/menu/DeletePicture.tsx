import { TrashIcon } from '@radix-ui/react-icons'
import { memo } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/elements/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import { useDeletePicture } from '../../api'

type DeletePictureProps = {
  pictureId: number
  userUid: string
}

const DeletePicture = memo(({ pictureId, userUid }: DeletePictureProps) => {
  const deletePictureMutation = useDeletePicture({
    userUid: userUid,
    mutationConfig: {
      onSuccess: () => {
        toast.success('絵を削除しました')
      },
      onError: () => {
        toast.error('絵の削除に失敗しました')
      },
    },
  })
  return (
    <Dialog>
      <DialogTrigger className='p-2'>
        <TrashIcon className='size-6' color='red' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>この絵を削除しますか？</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button
            className='mt-3 w-full'
            onClick={() => deletePictureMutation.mutate({ pictureId })}
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
