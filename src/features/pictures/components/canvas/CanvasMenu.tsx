import { DotsVerticalIcon } from '@radix-ui/react-icons'
import React, { memo } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ColorPicker } from './ColorPicker'

type CanvasMenuProps = {
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const CanvasMenu = memo(({ setColor }: CanvasMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='flex p-4' side='top'>
        <ColorPicker setColor={setColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

CanvasMenu.displayName = 'CanvasMenu'
