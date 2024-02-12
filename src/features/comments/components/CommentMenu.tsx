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
}

export const CommentMenu = ({ commentId, handleDeleteComment }: CommentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className='text-red-500 cursor-pointer focus:text-red-500'
          onClick={() => {
            handleDeleteComment(commentId)
          }}
        >
          <FaRegTrashAlt className='mr-4' />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            console.log('aaa')
          }}
        >
          <FaEdit className='mr-4' />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
