'use client'

import React from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { ThemeSelect } from '@/features/themes/components/ThemeSelect'

import { useDrawPicture } from '../../hooks/useDrawPicture'

import { CanvasMenu } from './CanvasMenu'

interface IProps {
  width: number
  height: number
}

export const Canvas: React.FC<IProps> = (props) => {
  const { width, height } = props
  const { user } = useFetchAuthUserByEmail()

  const {
    canvasRef,
    OnClick,
    OnMove,
    DrawEnd,
    Reset,
    handleSelectChange,
    selectedId,
    uploadPicture,
    setColor,
    setLineWidth,
  } = useDrawPicture({
    width: width,
    height: height,
    userId: user?.id,
    userName: user?.name,
  })
  return (
    <section>
      <div className='mb-4 border'>
        <canvas
          height={`${height}px`}
          onMouseDown={OnClick}
          onMouseMove={OnMove}
          onMouseOut={DrawEnd}
          onMouseUp={DrawEnd}
          ref={canvasRef}
          width={`${width}px`}
        />
      </div>
      <div className='float-right flex gap-2'>
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
        <CanvasMenu setColor={setColor} setLineWidth={setLineWidth} />
      </div>
    </section>
  )
}
