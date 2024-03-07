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
    <div className='mt-4 flex items-center justify-center gap-2'>
      <Slider
        className='w-[300px]'
        max={24}
        onValueChange={handleWidthChange}
        step={1}
        value={[lineWidth]}
      />
      {lineWidth} px
    </div>
  )
})

ManageLineWidth.displayName = 'ManageLineWidth'
