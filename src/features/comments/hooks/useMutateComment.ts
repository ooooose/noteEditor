import { useSession } from 'next-auth/react'
import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchComments } from './useFetchComments'
import { deleteComment, postComment } from '../api'
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
      })
      mutate()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    const params = {
      id: commentId,
    }
    try {
      await deleteComment(params)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }

  return {
    isLoading,
    pictureComments,
    onSubmitComment,
    handleDeleteComment,
    userId,
  }
}
