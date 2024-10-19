import { TrashIcon } from '@radix-ui/react-icons'
import { memo } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { useDeleteComment } from '../api'

type DeleteCommentProps = {
  commentId: number
  pictureId: number
}

export const DeleteComment = memo(({ commentId, pictureId }: DeleteCommentProps) => {
  const deleteCommentMutation = useDeleteComment({
    pictureId: pictureId,
    mutationConfig: {
      onSuccess: () => {
        toast.success('コメントを削除しました')
      },
      onError: () => {
        toast.error('コメントの削除に失敗しました')
      },
    },
  })

  return (
    <ConfirmationDialog
      body='本当に日記を削除してよろしいですか？'
      confirmButton={
        <Button
          isLoading={deleteCommentMutation.isLoading}
          onClick={() =>
            deleteCommentMutation.mutate({
              pictureId: pictureId,
              commentId: commentId,
            })
          }
          type='button'
          variant='destructive'
        >
          Delete
        </Button>
      }
      icon='danger'
      isDone={deleteCommentMutation.isSuccess}
      title='日記を削除します'
      triggerButton={
        <DropdownMenuItem className='cursor-pointer  text-red-500 focus:text-red-500'>
          <TrashIcon className='mr-4 size-5' />
          Delete
        </DropdownMenuItem>
      }
    />
  )
})

DeleteComment.displayName = 'DeleteComment'
