import { UpdateIcon } from '@radix-ui/react-icons'
import { memo, useState } from 'react'

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
  userUid: string
}

const SwitchPictureFrame = memo(({ picture, src, author, userUid }: SwitchPictureFrameProps) => {
  const { frameId, switchPictureFrameMutation } = useSwitchPictureFrame({
    picture: picture,
    userUid: userUid,
  })
  const [selectedFrameId, setSelectedFrameId] = useState(frameId)

  const handleSelectChange = (value: string) => {
    setSelectedFrameId(parseInt(value, 10))
  }

  return (
    <Dialog onOpenChange={(open) => open && setSelectedFrameId(frameId)}>
      <DialogTrigger className='p-2'>
        <UpdateIcon className='size-5' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>フレームを変更できます</DialogTitle>
        </DialogHeader>
        <div className='mx-auto flex w-[240px] flex-col gap-4'>
          <Picture author={author} frameId={selectedFrameId} src={src} />
          <FrameSelect frameId={selectedFrameId} handleSelectChange={handleSelectChange} />
        </div>
        <DialogClose asChild>
          <Button
            className='mt-3 w-full'
            onClick={() =>
              switchPictureFrameMutation.mutate({ id: picture.id, frame_id: selectedFrameId })
            }
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
