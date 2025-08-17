import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Picture } from './Picture'

type QuizModalProps = {
  title: string
  src: string
  frameId: number
  author: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const QuizModal = ({ title, src, frameId, author, isOpen, onOpenChange }: QuizModalProps) => {
  const [isDisplary, setIsDisplay] = useState<boolean>(false)
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
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
  )
}

export default QuizModal
