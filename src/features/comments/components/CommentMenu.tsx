'use client'

import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa'

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
          <BsThreeDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' side='bottom'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => {
              setEditedFlag(true)
            }}
          >
            <FaEdit className='mr-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer text-red-500 focus:text-red-500'
            onClick={() => {
              void handleDeleteComment(commentId)
            }}
          >
            <FaRegTrashAlt className='mr-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
)

export default CommentMenu
CommentMenu.displayName = 'CommentMenu'
