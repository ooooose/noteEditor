import { ColorWheelIcon } from '@radix-ui/react-icons'
import React, { memo } from 'react'

import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog'

type ColorType = {
  name: string
  class: string
  color: string
}

const Colors: ColorType[] = [
  {
    name: '黒',
    class: 'bg-black',
    color: '#000000',
  },
  {
    name: '青',
    class: 'bg-blue-500',
    color: '#3B82F6',
  },
  {
    name: '赤',
    class: 'bg-red-500',
    color: '#EF4444',
  },
  {
    name: '黄',
    class: 'bg-yellow-500',
    color: '#EAB308',
  },
  {
    name: '緑',
    class: 'bg-green-500',
    color: '#22C55E',
  },
  {
    name: '紫',
    class: 'bg-purple-500',
    color: '#A855F7',
  },
  {
    name: '橙',
    class: 'bg-orange-500',
    color: '#F97316',
  },
]

type ColorPickerProps = {
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const ColorPicker = memo(({ setColor }: ColorPickerProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='flex gap-3'>
          <div className='flex cursor-pointer p-4'>
            <ColorWheelIcon className='mr-2 size-6 text-gray-500' />
            ペン色の変更
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <p>ペン色を選択してください</p>
        <div className='mt-4 grid grid-cols-4 grid-rows-2 gap-5'>
          {Colors.map((color) => (
            <DialogClose asChild key={color.name}>
              <div
                className={`${color.class} cursor-pointer rounded-full border p-3 text-center text-white`}
                onClick={() => {
                  setColor(color.color)
                }}
              >
                {color.name}
              </div>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
})

ColorPicker.displayName = 'ColorPicker'
