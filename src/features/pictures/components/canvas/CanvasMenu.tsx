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
      <div className='w-full text-left'>
        <div className='space-y-5 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-5'>
          <div className='flex'>
            <ColorPicker color={color} setColor={setColor} setLineWidth={setLineWidth} />
          </div>
          <div className='space-y-5'>
            <ManageLineWidth lineWidth={lineWidth} setLineWidth={setLineWidth} />
            <ThemeSelect handleSelectChange={handleSelectChange} />
          </div>
        </div>
      </div>
    )
  },
)

CanvasMenu.displayName = 'CanvasMenu'
