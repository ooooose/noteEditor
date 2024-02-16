import React from 'react'
import { Modal } from '@/components/elements'
import { Button } from '@/components/elements/Button'
import { DialogClose } from '@/components/ui/dialog'

type PictureThemeProps = {
  title: string
}

export const PictureTheme = ({ title }: PictureThemeProps) => {
  return (
    <Modal text='テーマをみる' description='この絵のテーマは...'>
      <div className='mx-auto my-5'>
        <span className='font-bold'>{title}</span>でした。
      </div>
      <DialogClose asChild>
        <Button variant='outline' className='bg-gray-100'>
          閉じる
        </Button>
      </DialogClose>
    </Modal>
  )
}
