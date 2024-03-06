import React, { memo } from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

import { ThemeSelect } from '@/features/themes/components/ThemeSelect'

import { ColorPicker } from './ColorPicker'

type CanvasMenuProps = {
  selectedId: string
  handleSelectChange: (value: string) => void
  uploadPicture: () => Promise<void>
  setColor: React.Dispatch<React.SetStateAction<string>>
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
  Reset: () => void
}

export const CanvasMenu = memo(
  ({
    setColor,
    // setLineWidth,
    selectedId,
    handleSelectChange,
    uploadPicture,
    Reset,
  }: CanvasMenuProps) => {
    return (
      <div className='fixed bottom-0 left-0 h-[200px] w-full bg-gray-100'>
        <div className='ml-10'>
          <ColorPicker setColor={setColor} />
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
    )
  },
)

CanvasMenu.displayName = 'CanvasMenu'
