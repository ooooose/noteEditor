import React, { memo } from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/elements/Button'
import { DialogClose } from '@/components/ui/dialog'

import { ThemeSelect } from '@/features/themes/components/ThemeSelect'

import { ColorPicker } from './ColorPicker'
import { ManageLineWidth } from './ManageLineWidth'
import { ThemeDescription } from './ThemeDescription'

type CanvasMenuProps = {
  title: string
  handleSelectChange: (value: string) => void
  uploadPicture: () => Promise<void>
  setColor: React.Dispatch<React.SetStateAction<string>>
  lineWidth: number
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
  Reset: () => void
  color: string
  isLoading: boolean
}

export const CanvasMenu = memo(
  ({
    setColor,
    lineWidth,
    setLineWidth,
    title,
    handleSelectChange,
    uploadPicture,
    Reset,
    color,
    isLoading,
  }: CanvasMenuProps) => {
    return (
      <div className='h-[150px] w-full pt-4 text-left'>
        <div className='mx-5'>
          <div className='mb-3 ml-10 flex'>
            <ColorPicker color={color} setColor={setColor} setLineWidth={setLineWidth} />
          </div>
          <div className='mx-10 mt-10'>
            <ManageLineWidth lineWidth={lineWidth} setLineWidth={setLineWidth} />
            <div className='mt-10'>
              <ThemeSelect handleSelectChange={handleSelectChange} />
            </div>
            <div className='mt-10 flex justify-end gap-3'>
              <ThemeDescription />
              <Modal description='絵をリセットしますか？' text='リセット'>
                <DialogClose asChild>
                  <Button onClick={Reset} variant='destructive'>
                    絵をリセットする
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className='bg-gray-100' variant='outline'>
                    キャンセル
                  </Button>
                </DialogClose>
              </Modal>
              <Modal description='絵を登録しますか？' text='登録'>
                {!title && <small className='text-red-500'>テーマを入力してください</small>}
                <Button
                  disabled={!title || isLoading}
                  isLoading={isLoading}
                  onClick={uploadPicture}
                  variant='outline'
                >
                  登録する
                </Button>
                <DialogClose asChild>
                  <Button className='bg-gray-100' variant='outline'>
                    キャンセル
                  </Button>
                </DialogClose>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

CanvasMenu.displayName = 'CanvasMenu'
