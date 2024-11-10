import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'

import { useDeleteUser } from '../api'

type DeleteUserProps = {
  userUid: string | undefined
}

export const DeleteUser = ({ userUid }: DeleteUserProps) => {
  const navigation = useRouter()
  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        toast.success('ユーザーを削除しました')
        signOut().then(() => {
          navigation.push('/')
        })
      },
      onError: () => {
        toast.error('ユーザーの削除に失敗しました')
      },
    },
  })
  return (
    <ConfirmationDialog
      body='退会処理をすると全てのデータが消失します。よろしいですか？'
      confirmButton={
        <Button
          isLoading={deleteUserMutation.isPending}
          onClick={() => deleteUserMutation.mutate({ userUid: userUid ?? '' })}
          type='button'
          variant='destructive'
        >
          退会
        </Button>
      }
      icon='danger'
      title='退会処理をしますか？'
      triggerButton={<Button variant='destructive'>退会する</Button>}
    />
  )
}
