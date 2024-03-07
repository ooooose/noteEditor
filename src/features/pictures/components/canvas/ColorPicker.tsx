import React, { memo } from 'react'

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
  color: string
}

export const ColorPicker = memo(({ setColor, color }: ColorPickerProps) => {
  return (
    <div className='mt-4 flex gap-3'>
      {Colors.map((Color) => (
        <div
          className={Color.color === color ? 'rounded-full border border-black' : ''}
          key={Color.name}
        >
          <div
            className={`${Color.class} cursor-pointer rounded-full border p-3 text-center text-white`}
            onClick={() => {
              setColor(Color.color)
            }}
          ></div>
        </div>
      ))}
    </div>
  )
})

ColorPicker.displayName = 'ColorPicker'
