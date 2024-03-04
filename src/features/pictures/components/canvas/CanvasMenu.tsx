import { DotsVerticalIcon } from '@radix-ui/react-icons'
import React, { memo } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ColorPicker } from './ColorPicker'
import { ManageLineWidth } from './ManageLineWidth'

type CanvasMenuProps = {
  setColor: React.Dispatch<React.SetStateAction<string>>
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
}

export const CanvasMenu = memo(({ setColor, setLineWidth }: CanvasMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='flex flex-col' side='top'>
        <ColorPicker setColor={setColor} />
        <ManageLineWidth setLineWidth={setLineWidth} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

CanvasMenu.displayName = 'CanvasMenu'
