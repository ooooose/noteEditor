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
    OnPointerDown,
    OnPointerMove,
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
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-4 py-4 sm:gap-6'>
      <Card className='flex-1 border-white/40 bg-white/60 backdrop-blur'>
        <CardHeader className='flex-row items-center justify-between space-y-0 p-4 sm:p-6'>
          <CardTitle className='text-lg font-semibold sm:text-xl'>お絵描き画面</CardTitle>
          <Button size='icon' variant='outline'>
            <Info className='size-4' />
          </Button>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 px-4 pb-4 sm:px-6 sm:pb-6 lg:flex-row'>
          <div className='relative w-full flex-1 overflow-hidden rounded-xl border bg-white shadow-[inset_0_0_0_1px_rgba(17,24,39,0.06)]'>
            <canvas
              className='block h-auto w-full touch-none'
              height={height}
              onPointerCancel={DrawEnd}
              onPointerDown={OnPointerDown}
              onPointerLeave={DrawEnd}
              onPointerMove={OnPointerMove}
              onPointerUp={DrawEnd}
              ref={canvasRef}
              width={width}
            />
          </div>
          <div className='w-full lg:w-80'>
            <CanvasMenu
              color={color}
              handleSelectChange={handleSelectChange}
              lineWidth={lineWidth}
              setColor={setColor}
              setLineWidth={setLineWidth}
            />
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6'>
          <div className='grid w-full grid-cols-1 gap-3 sm:flex sm:w-auto sm:flex-wrap'>
            <Modal description='絵をリセットしますか？' text='リセット'>
              <DialogClose asChild>
                <Button className='w-full sm:w-auto' onClick={Reset} variant='destructive'>
                  絵をリセットする
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className='w-full bg-gray-100 sm:w-auto' variant='outline'>
                  キャンセル
                </Button>
              </DialogClose>
            </Modal>
            <div className='flex justify-center sm:block'>
              <ThemeDescription />
            </div>
          </div>
          <div className='grid w-full grid-cols-1 gap-3 sm:flex sm:w-auto sm:justify-end'>
            <Modal description='絵を登録しますか？' text='登録'>
              {!title && <small className='text-red-500'>テーマを入力してください</small>}
              {isLoading && (
                <small className='text-gray-500'>
                  画像を処理しています。しばらくお待ちください...
                </small>
              )}
              <Button
                className='w-full sm:w-auto'
                disabled={!title || isLoading}
                icon={<Save className='size-4' />}
                isLoading={isLoading}
                onClick={uploadPicture}
                variant='outline'
              >
                登録する
              </Button>
              <DialogClose asChild>
                <Button className='w-full bg-gray-100 sm:w-auto' variant='outline'>
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
