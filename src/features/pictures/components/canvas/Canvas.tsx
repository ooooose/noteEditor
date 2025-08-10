'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { Info, Save } from 'lucide-react'
import React from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

import { useDrawPicture } from '../../hooks/useDrawPicture'

import { CanvasMenu } from './CanvasMenu'
import { ThemeDescription } from './ThemeDescription'

interface IProps {
  width: number
  height: number
}

export const Canvas: React.FC<IProps> = (props) => {
  const { width, height } = props

  const {
    canvasRef,
    OnClick,
    OnMove,
    DrawEnd,
    Reset,
    lineWidth,
    color,
    handleSelectChange,
    title,
    uploadPicture,
    setColor,
    setLineWidth,
    isLoading,
  } = useDrawPicture({
    width: width,
    height: height,
  })
  return (
    <div className='container flex flex-col gap-4 py-4'>
      <Card className='flex-1'>
        <CardHeader className='flex-row items-center justify-between space-y-0'>
          <CardTitle className='text-xl font-semibold'>お絵描き画面</CardTitle>
          <Button size='icon' variant='outline'>
            <Info className='size-4' />
          </Button>
        </CardHeader>
        <CardContent className='flex gap-4 p-4'>
          <div className='relative flex-1 border'>
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
          <div className='w-85 flex flex-col gap-4'>
            <CanvasMenu
              color={color}
              handleSelectChange={handleSelectChange}
              lineWidth={lineWidth}
              setColor={setColor}
              setLineWidth={setLineWidth}
            />
          </div>
        </CardContent>
        <CardFooter className='justify-between'>
          <div className='flex gap-3'>
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
            <ThemeDescription />
          </div>
          <div className='flex justify-end gap-3'>
            <Modal description='絵を登録しますか？' text='登録'>
              {!title && <small className='text-red-500'>テーマを入力してください</small>}
              <Button
                disabled={!title || isLoading}
                icon={<Save className='size-4' />}
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
        </CardFooter>
      </Card>
    </div>
  )
}
