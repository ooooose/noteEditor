'use client'

import { DotsVerticalIcon, TwitterLogoIcon, DownloadIcon } from '@radix-ui/react-icons'
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
import SwitchPictureFrame from './menu/SwitchPictureFrame'

type PictureMenuProps = {
  picture: Picture
}

const PictureMenu = React.memo(({ picture }: PictureMenuProps) => {
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
        <SwitchPictureFrame author={picture.author} pictureId={picture.id} src={picture.image} />
        <DeletePicture image={picture.image} pictureId={picture.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

export default PictureMenu
PictureMenu.displayName = 'PictureMenu'
