import { memo } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FrameSelectProps = {
  handleSelectChange: (value: string) => void
}

type selectObjectType = {
  frameId: number
  content: string
}

const selectObject: selectObjectType[] = [
  {
    frameId: 0,
    content: 'フレーム1',
  },
  {
    frameId: 1,
    content: 'フレーム2',
  },
]

export const FrameSelect = memo(({ handleSelectChange }: FrameSelectProps) => {
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className='w-[280px]'>
        <SelectValue placeholder='フレームを選択してください' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectObject?.map((object) => {
            return (
              <SelectItem key={object.frameId} value={object.frameId.toString()}>
                {object.content}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
})

FrameSelect.displayName = 'FrameSelect'
