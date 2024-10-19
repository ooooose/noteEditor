'use client'

import { DotsVerticalIcon, Pencil2Icon } from '@radix-ui/react-icons'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { DeleteComment } from './DeleteComment'

type CommentMenuProps = {
  commentId: number
  pictureId: number
  setEditedFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentMenu = React.memo(({ commentId, pictureId, setEditedFlag }: CommentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' side='bottom'>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            setEditedFlag(true)
          }}
        >
          <Pencil2Icon className='mr-4 size-5' />
          Edit
        </DropdownMenuItem>
        <DeleteComment commentId={commentId} pictureId={pictureId} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

export default CommentMenu
CommentMenu.displayName = 'CommentMenu'
