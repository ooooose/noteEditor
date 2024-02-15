import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const PictureMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='h-[65px] focus:outline-none'>
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex' side='bottom' align='end'>
        <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
