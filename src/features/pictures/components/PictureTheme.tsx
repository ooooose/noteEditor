import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { memo } from 'react'

import { Button } from '@/components/elements/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@/components/ui/dialog'

type PictureThemeProps = {
  title: string
}

const PictureTheme = memo(({ title }: PictureThemeProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='flex gap-3'>
          <div className='cursor-pointer rounded-full border p-3'>
            <QuestionMarkIcon className='text-gray-500' />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>絵のテーマは...</DialogTitle>
        </DialogHeader>
        <div className='mx-auto my-5'>
          <span className='font-bold'>{title}</span>でした。
        </div>
        <DialogClose asChild>
          <Button className='bg-gray-100' variant='outline'>
            閉じる
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
})

export default PictureTheme
PictureTheme.displayName = 'PictureTheme'
