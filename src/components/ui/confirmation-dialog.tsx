import { AlertCircle, Info } from 'lucide-react'
import * as React from 'react'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

import { useDisclosure } from '@/hooks/use-disclosure'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement
  confirmButton: React.ReactElement
  title: string
  body?: string
  cancelButtonText?: string
  icon?: 'danger' | 'info'
  isDone?: boolean
}

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = '',
  cancelButtonText = 'キャンセル',
  icon = 'danger',
  isDone = false,
}: ConfirmationDialogProps) => {
  const { close, open, isOpen } = useDisclosure()
  const cancelButtonRef = React.useRef(null)

  useEffect(() => {
    if (isDone) {
      close()
    }
  }, [isDone, close])

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          close()
        } else {
          open()
        }
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex'>
          <DialogTitle className='flex items-center gap-2'>
            {icon === 'danger' && (
              <AlertCircle aria-hidden='true' className='size-6 text-red-600' />
            )}
            {icon === 'info' && <Info aria-hidden='true' className='size-6 text-blue-600' />}
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          {body &&
            body.split('\n').map((text, index) => (
              <span className='block' key={index}>
                {text}
              </span>
            ))}
        </DialogDescription>

        <DialogFooter>
          {confirmButton}
          <Button onClick={close} ref={cancelButtonRef} variant='outline'>
            {cancelButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
