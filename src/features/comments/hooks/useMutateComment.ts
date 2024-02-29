import { toast } from 'sonner'

import { AuthUser } from '@/features/auth/types'

import { deleteComment, postComment, updateComment } from '../api'
import { Comment } from '../types'

import { useFetchComments } from './useFetchComments'

export const useMutateComment = (pictureId: string, user: AuthUser) => {
  const { comments, mutate, isLoading } = useFetchComments()
  const pictureComments =
    comments && comments?.filter((comment: Comment) => comment.pictureId === pictureId)
  const generateParams = () => {
    const params = {
      userId: user.id,
      pictureId: pictureId,
    }
    return params
  }

  const onSubmitComment = async (body: string) => {
    const params = generateParams()
    try {
      await postComment({
        ...params,
        userName: user.name,
        body: body,
      })
      toast('コメントを作成しました', { position: 'top-center' })
      mutate()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    const params = {
      id: commentId,
    }
    try {
      await deleteComment(params)
      toast('コメントを削除しました', { position: 'top-center' })
      mutate()
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
  }
}
