import { UpdateIcon } from '@radix-ui/react-icons'
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

import { useSwitchPictureFrame } from '../../hooks/useSwitchPictureFrame'
import { Picture as PictureType } from '../../types'
import { FrameSelect } from '../Frames/FrameSelect'
import { Picture } from '../Picture'

type SwitchPictureFrameProps = {
  picture: PictureType
  src: string
  author: string
}

const SwitchPictureFrame = memo(({ picture, src, author }: SwitchPictureFrameProps) => {
  const { frameId, handleUpdateFrameId, switchPictureFrameMutation } = useSwitchPictureFrame({
    picture: picture,
  })
  return (
    <Dialog>
      <DialogTrigger className='py-2'>
        <UpdateIcon className='size-5' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>フレームを変更できます</DialogTitle>
        </DialogHeader>
        <div className='mx-auto flex w-[240px] flex-col gap-4'>
          <Picture author={author} frameId={frameId} src={src} />
          <FrameSelect handleSelectChange={handleUpdateFrameId} />
        </div>
        <DialogClose asChild>
          <Button
            className='mt-3 w-full'
            onClick={() => switchPictureFrameMutation.mutate({ id: picture.id, frameId: frameId })}
            variant='outline'
          >
            登録する
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
})

export default SwitchPictureFrame
SwitchPictureFrame.displayName = 'SwitchPictureFrame'
