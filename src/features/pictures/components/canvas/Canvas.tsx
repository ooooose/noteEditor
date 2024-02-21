'use client'

import React from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { ThemeSelect } from '@/features/themes/components/ThemeSelect'

import { useDrawPicture } from '../../hooks/useDrawPicture'

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
  } = useDrawPicture({
    width: width,
    height: height,
    userId: user.id,
    userName: user.name,
  })

  return (
    <section>
      <ThemeSelect handleSelectChange={handleSelectChange} />
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
      <div className='flex gap-2'>
        <Button onClick={Reset}>リセット</Button>
        <Modal description='絵を登録しますか？' text='登録'>
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
    </section>
  )
}
