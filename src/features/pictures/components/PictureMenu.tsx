import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeletePicture } from './menu'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { IoMdDownload } from 'react-icons/io'
import { MdChangeCircle } from 'react-icons/md'
import { Tooltip } from '@/components/elements/Tooltip/Tooltip'
import { Picture } from '../types'

type PictureMenuProps = {
  picture: Picture
}

export const PictureMenu = ({ picture }: PictureMenuProps) => {
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
        <DeletePicture pictureId={picture.id} image={picture.image} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
