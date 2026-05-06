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
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className='w-full sm:w-auto' variant='outline'>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[calc(100vw-2rem)] max-w-md sm:max-w-[425px]'>
        <DialogHeader>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
