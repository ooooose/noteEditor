import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { IoMdDownload } from 'react-icons/io'
import { MdChangeCircle } from 'react-icons/md'

export const PictureMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='h-[65px] focus:outline-none'>
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex' side='bottom' align='end'>
        <DropdownMenuItem className='cursor-pointer'>
          <FaSquareXTwitter size={24} />
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          <IoMdDownload size={24} />
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          <MdChangeCircle size={24} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
