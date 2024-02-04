'use client'

import React from 'react'
import { useDrawPicture } from '../../hooks/useDrawPicture'
import { ThemeSelect } from '@/features/themes/components/ThemeSelect'
import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useSession } from 'next-auth/react'

interface IProps {
  width: number
  height: number
}

export const Canvas: React.FC<IProps> = (props) => {
  const { width, height } = props
  const { data: session } = useSession()
  const email = session?.user.email

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
    email: email ?? '',
  })

  return (
    <section>
      <ThemeSelect handleSelectChange={handleSelectChange} selectedId={selectedId} />
      <div className='border mb-4'>
        <canvas
          onMouseDown={OnClick}
          onMouseMove={OnMove}
          onMouseUp={DrawEnd}
          onMouseOut={DrawEnd}
          ref={canvasRef}
          width={`${width}px`}
          height={`${height}px`}
        />
      </div>
      <div className='flex gap-2'>
        <Button onClick={Reset}>リセット</Button>
        <Modal text='登録' description='絵を登録しますか？'>
          <Button disabled={!selectedId} variant='outline' onClick={uploadPicture}>
            登録する
          </Button>
          <DialogClose asChild>
            <Button variant='outline' className='bg-gray-100'>
              キャンセル
            </Button>
          </DialogClose>
        </Modal>
      </div>
    </section>
  )
}
