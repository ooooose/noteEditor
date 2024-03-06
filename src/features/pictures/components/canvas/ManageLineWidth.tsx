import React, { memo } from 'react'

import { Slider } from '@/components/ui/slider'

type ManageLineWidthProps = {
  lineWidth: number
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
}

export const ManageLineWidth = memo(({ lineWidth, setLineWidth }: ManageLineWidthProps) => {
  console.log(lineWidth)
  console.log(setLineWidth)
  return <Slider className='w-[300px]' defaultValue={[50]} max={100} step={1} />
})

ManageLineWidth.displayName = 'ManageLineWidth'
