'use client'

import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { memo } from 'react'

import { Tooltip } from '@/components/elements/Tooltip/Tooltip'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import DeletePicture from './menu/DeletePicture'
import SwitchPictureFrame from './menu/SwitchPictureFrame'

import type { Picture } from '../types'

type PictureMenuProps = {
  picture: Picture
}

const PictureMenu = memo(({ picture }: PictureMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='h-[65px] focus:outline-none'>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='flex' side='bottom'>
        <Tooltip content='絵を削除'>
          <Button className='border-none p-2' variant='outline'>
            <DeletePicture pictureId={picture.id} />
          </Button>
        </Tooltip>
        <Tooltip content='フレームを変更'>
          <Button className='border-none p-2' variant='outline'>
            <SwitchPictureFrame
              author={picture.user.name}
              picture={picture}
              src={picture.imageUrl}
            />
          </Button>
        </Tooltip>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

export default PictureMenu
PictureMenu.displayName = 'PictureMenu'
