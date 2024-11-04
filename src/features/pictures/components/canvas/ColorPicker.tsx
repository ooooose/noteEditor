import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import { Eraser } from 'lucide-react'
import React, { memo } from 'react'

import { Colors } from '@/utils/constants'

type ColorPickerProps = {
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  color: string
}

export const ColorPicker = memo(({ setLineWidth, setColor, color }: ColorPickerProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <p>色選択</p>
      <div className='grid grid-cols-6 gap-2'>
        <TooltipProvider>
          {Colors.map((c, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  className={`size-8 rounded-full ${color === c.color ? 'ring-2 ring-offset-2' : ''}`}
                  onClick={() => setColor(c.color)}
                  style={{ backgroundColor: c.color }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{c.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={`flex size-8 items-center justify-center rounded-full border bg-white ${
                  color === '#FFFFFF' ? 'ring-2 ring-offset-2' : ''
                }`}
                onClick={() => {
                  setColor('#FFFFFF')
                  setLineWidth(12)
                }}
              >
                <Eraser className='size-4' />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>消しゴム</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
})

ColorPicker.displayName = 'ColorPicker'
