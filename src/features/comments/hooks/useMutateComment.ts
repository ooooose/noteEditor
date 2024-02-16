import { useSession } from 'next-auth/react'
import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchComments } from './useFetchComments'
import { deleteComment, postComment, updateComment } from '../api'
import { toast } from 'sonner'
import { Comment } from '../types'

export const useMutateComment = (pictureId: string) => {
  const { data: session } = useSession()
  const { comments, mutate, isLoading } = useFetchComments()
  const { user: authUser } = useFetchAuthUserByEmail(session?.user.email ?? '')
  const userId = authUser?.id
  const pictureComments =
    comments && comments?.filter((comment: Comment) => comment.pictureId === pictureId)
  const generateParams = () => {
    const params = {
      email: session?.user.email ?? '',
      pictureId: pictureId,
    }
    return params
  }

  const onSubmitComment = async (body: string) => {
    const params = generateParams()
    try {
      await postComment({
        ...params,
        body: body,
      }).then((res) => {
        if (res.status === 201) {
          toast('コメントを作成しました', { position: 'top-center' })
          mutate()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    const params = {
      id: commentId,
    }
    try {
      await deleteComment(params).then((res) => {
        if (res.status === 200) {
          toast('コメントを削除しました', { position: 'top-center' })
          mutate()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateComment = async (commentId: number, body: string) => {
    const params = {
      id: commentId,
      body: body,
    }
    try {
      await updateComment(params).then((res) => {
        if (res.status === 200) {
          toast('コメントを更新しました', { position: 'top-center' })
          mutate()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return {
    isLoading,
    pictureComments,
    onSubmitComment,
    handleDeleteComment,
    handleUpdateComment,
    userId,
  }
}
