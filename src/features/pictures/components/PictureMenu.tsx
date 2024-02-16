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
import { FaRegTrashAlt } from 'react-icons/fa'
import { Tooltip } from '@/components/elements/Tooltip/Tooltip'

export const PictureMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='h-[65px] focus:outline-none'>
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex' side='bottom' align='end'>
        <Tooltip content='Xシェア'>
          <DropdownMenuItem className='cursor-pointer'>
            <FaSquareXTwitter size={24} />
          </DropdownMenuItem>
        </Tooltip>
        <Tooltip content='ダウンロード'>
          <DropdownMenuItem className='cursor-pointer'>
            <IoMdDownload size={24} />
          </DropdownMenuItem>
        </Tooltip>
        <Tooltip content='額縁を変更'>
          <DropdownMenuItem className='cursor-pointer'>
            <MdChangeCircle size={24} />
          </DropdownMenuItem>
        </Tooltip>
        <Tooltip content='絵を削除する'>
          <DropdownMenuItem className='cursor-pointer'>
            <FaRegTrashAlt size={24} color='red' />
          </DropdownMenuItem>
        </Tooltip>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
