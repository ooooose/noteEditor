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

import { baseURL } from '@/lib/constants/env'

import DeletePicture from './menu/DeletePicture'
import SwitchPictureFrame from './menu/SwitchPictureFrame'
import XShareButton from './menu/XShareButton'

import type { Picture } from '../types'

type PictureMenuProps = {
  picture: Picture
  userUid: string
}

const PictureMenu = memo(({ picture, userUid }: PictureMenuProps) => {
  const url = `${baseURL}?${picture.id}`
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='h-[65px] focus:outline-none'>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='flex' side='bottom'>
        <Tooltip content='絵を削除'>
          <Button className='border-none p-2' variant='outline'>
            <DeletePicture pictureId={picture.id} userUid={userUid} />
          </Button>
        </Tooltip>
        <Tooltip content='フレームを変更'>
          <Button className='border-none p-2' variant='outline'>
            <SwitchPictureFrame
              author={picture.user.name}
              picture={picture}
              src={picture.imageUrl}
              userUid={userUid}
            />
          </Button>
        </Tooltip>
        <Tooltip content='Xに共有'>
          <Button className='border-none p-2' variant='outline'>
            <XShareButton url={url} />
          </Button>
        </Tooltip>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

export default PictureMenu
PictureMenu.displayName = 'PictureMenu'
