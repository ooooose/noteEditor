import React, { memo } from 'react'

import { ThemeSelect } from '@/features/themes/components/ThemeSelect'

import { ColorPicker } from './ColorPicker'
import { ManageLineWidth } from './ManageLineWidth'

type CanvasMenuProps = {
  handleSelectChange: (value: string) => void
  setColor: React.Dispatch<React.SetStateAction<string>>
  lineWidth: number
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
  color: string
}

export const CanvasMenu = memo(
  ({ setColor, lineWidth, setLineWidth, handleSelectChange, color }: CanvasMenuProps) => {
    return (
      <div className='h-[150px] w-full text-left'>
        <div className='mx-5'>
          <div className='mb-3 flex'>
            <ColorPicker color={color} setColor={setColor} setLineWidth={setLineWidth} />
          </div>
          <div className='mt-6'>
            <ManageLineWidth lineWidth={lineWidth} setLineWidth={setLineWidth} />
            <div className='mt-6'>
              <ThemeSelect handleSelectChange={handleSelectChange} />
            </div>
          </div>
        </div>
      </div>
    )
  },
)

CanvasMenu.displayName = 'CanvasMenu'
