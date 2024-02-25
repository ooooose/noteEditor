import React from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/elements/Button'
import { DialogClose } from '@/components/ui/dialog'

type PictureThemeProps = {
  title: string
}

const PictureTheme = ({ title }: PictureThemeProps) => {
  return (
    <Modal description='この絵のテーマは...' text='テーマをみる'>
      <div className='mx-auto my-5'>
        <span className='font-bold'>{title}</span>でした。
      </div>
      <DialogClose asChild>
        <Button className='bg-gray-100' variant='outline'>
          閉じる
        </Button>
      </DialogClose>
    </Modal>
  )
}

export default PictureTheme
