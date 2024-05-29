import { useCallback } from 'react'
import { toast } from 'sonner'

import { AuthUser } from '@/features/auth/types'

import { deleteComment, postComment, updateComment } from '../api'

import { useFetchComments } from './useFetchComments'

export const useMutateComment = (pictureId: string, user: AuthUser) => {
  const { comments, isLoading, mutate } = useFetchComments(pictureId)

  const onSubmitComment = useCallback(
    async (body: string) => {
      const params = {
        userId: user.id,
        pictureId: pictureId,
      }
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
    },
    [mutate, user.name, pictureId, user.id],
  )

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
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
    },
    [mutate],
  )

  const handleUpdateComment = useCallback(
    async (commentId: number, body: string) => {
      const params = {
        id: commentId,
        body: body,
      }
      try {
        await updateComment(params)
        toast('コメントを更新しました', { position: 'top-center' })
        mutate()
      } catch (err) {
        console.log(err)
      }
    },
    [mutate],
  )

  return {
    isLoading,
    comments,
    onSubmitComment,
    handleDeleteComment,
    handleUpdateComment,
  }
}
