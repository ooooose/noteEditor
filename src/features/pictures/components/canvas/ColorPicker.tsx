import { EraserIcon } from '@radix-ui/react-icons'
import React, { memo } from 'react'

import { Colors } from '@/utils/constants'

type ColorPickerProps = {
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  color: string
}

export const ColorPicker = memo(({ setLineWidth, setColor, color }: ColorPickerProps) => {
  return (
    <div className='mx-auto mt-4 flex gap-3'>
      {Colors.map((Color) => {
        if (Color.name === '消しゴム')
          return (
            <div
              className={Color.color === color ? 'rounded-full border border-black' : ''}
              key={Color.name}
            >
              <div
                className='cursor-pointer rounded-full border p-3'
                onClick={() => {
                  setColor(Color.color)
                  setLineWidth(12)
                }}
              >
                <EraserIcon className='size-5' />
              </div>
            </div>
          )
        return (
          <div
            className={Color.color === color ? 'rounded-full border-2 border-black' : ''}
            key={Color.name}
          >
            <div
              className={`${Color.class} cursor-pointer rounded-full border p-5`}
              onClick={() => {
                setColor(Color.color)
              }}
            ></div>
          </div>
        )
      })}
    </div>
  )
})

ColorPicker.displayName = 'ColorPicker'
