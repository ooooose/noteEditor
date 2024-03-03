import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { memo, useState } from 'react'

import { Button } from '@/components/elements/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@/components/ui/dialog'

import { Picture } from './Picture'

type PictureThemeProps = {
  title: string
  src: string
  frameId: number
  author: string
}

const PictureTheme = memo(({ src, frameId, author, title }: PictureThemeProps) => {
  const [isDisplary, setIsDisplay] = useState<boolean>(false)
  return (
    <div>
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
            <DialogTitle>この絵のテーマはなんでしょう？</DialogTitle>
          </DialogHeader>
          <div className='mx-auto flex w-[240px] flex-col gap-6'>
            <Picture author={author} frameId={frameId} src={src} />
            <div className='mx-auto'>
              正解は<span className={isDisplary ? 'font-bold' : 'bg-black'}>{title}</span>です！
            </div>
          </div>
          <Button
            disabled={isDisplary}
            onClick={() => {
              setIsDisplay(true)
            }}
            variant='outline'
          >
            答えをみる
          </Button>
          <DialogClose asChild>
            <Button className='bg-gray-100' variant='outline'>
              閉じる
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <p className='text-center text-xs'>クイズ</p>
    </div>
  )
})

export default PictureTheme
PictureTheme.displayName = 'PictureTheme'
