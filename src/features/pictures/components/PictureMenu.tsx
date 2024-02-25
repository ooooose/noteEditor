'use client'

import { DotsVerticalIcon, TwitterLogoIcon, DownloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import React from 'react'

import { Tooltip } from '@/components/elements/Tooltip/Tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Picture } from '../types'

import DeletePicture from './menu/DeletePicture'

type PictureMenuProps = {
  picture: Picture
}

const PictureMenu = ({ picture }: PictureMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='h-[65px] focus:outline-none'>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='flex' side='bottom'>
        <Tooltip content='Xシェア'>
          <DropdownMenuItem className='cursor-pointer'>
            <TwitterLogoIcon className='size-5' />
          </DropdownMenuItem>
        </Tooltip>
        <Tooltip content='ダウンロード'>
          <DropdownMenuItem className='cursor-pointer'>
            <DownloadIcon className='size-5' />
          </DropdownMenuItem>
        </Tooltip>
        <Tooltip content='額縁を変更'>
          <DropdownMenuItem className='cursor-pointer'>
            <UpdateIcon className='size-5' />
          </DropdownMenuItem>
        </Tooltip>
        <DeletePicture image={picture.image} pictureId={picture.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PictureMenu
