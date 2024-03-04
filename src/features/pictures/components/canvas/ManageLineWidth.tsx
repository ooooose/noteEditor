import { BorderWidthIcon } from '@radix-ui/react-icons'
import React, { memo } from 'react'

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

type LineWidthType = {
  width: number
  name: string
}

const LineWidths: LineWidthType[] = [
  {
    width: 1,
    name: '1px',
  },
  {
    width: 2,
    name: '2px',
  },
  {
    width: 5,
    name: '5px',
  },
  {
    width: 12,
    name: '12px',
  },
  {
    width: 24,
    name: '24px',
  },
]

type ManageLineWidthProps = {
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
}

export const ManageLineWidth = memo(({ setLineWidth }: ManageLineWidthProps) => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <div className='flex gap-3'>
          <div className='flex cursor-pointer p-2'>
            <BorderWidthIcon className='mr-2 size-6 text-gray-500' />
            ペンの太さ調整
          </div>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {LineWidths.map((LineWidth) => (
            <DropdownMenuItem
              key={LineWidth.name}
              onClick={() => {
                setLineWidth(LineWidth.width)
              }}
            >
              {LineWidth.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
})

ManageLineWidth.displayName = 'ManageLineWidth'
