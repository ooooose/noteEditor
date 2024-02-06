import React, { ReactNode, SetStateAction } from 'react'
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
  open?: boolean
  setOpen?: React.Dispatch<SetStateAction<boolean>>
}

const Modal = ({ text, description, open, setOpen, children }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
