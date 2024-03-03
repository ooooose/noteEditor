'use client'

import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type CommentMenuProps = {
  commentId: number
  handleDeleteComment: (commentId: number) => Promise<void>
  setEditedFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentMenu = React.memo(
  ({ commentId, handleDeleteComment, setEditedFlag }: CommentMenuProps) => {
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
          <DropdownMenuItem
            className='cursor-pointer text-red-500 focus:text-red-500'
            onClick={() => {
              handleDeleteComment(commentId)
            }}
          >
            <TrashIcon className='mr-4 size-5' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
)

export default CommentMenu
CommentMenu.displayName = 'CommentMenu'
