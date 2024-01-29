import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

type ModalProps = {
  text: string
  description: string
  children: ReactNode
}

const Modal = ({ text, description, children }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{text}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
