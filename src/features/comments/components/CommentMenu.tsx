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

export const CommentMenu = ({
  commentId,
  handleDeleteComment,
  setEditedFlag,
}: CommentMenuProps) => {
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
            setEditedFlag(true)
          }}
        >
          <FaEdit className='mr-4' />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
