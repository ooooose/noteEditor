import React, { memo } from 'react'

import { Slider } from '@/components/ui/slider'

type ManageLineWidthProps = {
  lineWidth: number
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
}

export const ManageLineWidth = memo(({ lineWidth, setLineWidth }: ManageLineWidthProps) => {
  const handleWidthChange = (value: number[]) => {
    setLineWidth(value[0])
  }
  return (
    <div className='items-center justify-center'>
      <p className='mb-3'>線の太さ: {lineWidth} px</p>
      <Slider
        className='w-[300px]'
        max={24}
        min={1}
        onValueChange={handleWidthChange}
        step={1}
        value={[lineWidth]}
      />
    </div>
  )
})

ManageLineWidth.displayName = 'ManageLineWidth'
