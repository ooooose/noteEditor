import React, { memo } from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

import { ThemeSelect } from '@/features/themes/components/ThemeSelect'

import { ColorPicker } from './ColorPicker'
import { ManageLineWidth } from './ManageLineWidth'

type CanvasMenuProps = {
  selectedId: string
  handleSelectChange: (value: string) => void
  uploadPicture: () => Promise<void>
  setColor: React.Dispatch<React.SetStateAction<string>>
  lineWidth: number
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
  Reset: () => void
  color: string
}

export const CanvasMenu = memo(
  ({
    setColor,
    lineWidth,
    setLineWidth,
    selectedId,
    handleSelectChange,
    uploadPicture,
    Reset,
    color,
  }: CanvasMenuProps) => {
    return (
      <div className='fixed bottom-0 left-0 h-[200px] w-full border pt-4'>
        <div className='mx-auto w-[960px]'>
          <div className='ml-10 flex flex-col gap-5'>
            <ColorPicker color={color} setColor={setColor} />
            <ManageLineWidth lineWidth={lineWidth} setLineWidth={setLineWidth} />
          </div>
          <div className='float-right mr-10 flex gap-3'>
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
              <ThemeSelect handleSelectChange={handleSelectChange} />
              <Button disabled={!selectedId} onClick={uploadPicture} variant='outline'>
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
    )
  },
)

CanvasMenu.displayName = 'CanvasMenu'
