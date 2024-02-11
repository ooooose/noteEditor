import { useSession } from 'next-auth/react'
import { useFetchComments } from './useFetchComments'
import { postComment } from '../api'
import { Comment } from '../types'

export const useMutateComment = (pictureId: string) => {
  const { data: session } = useSession()
  const { comments, mutate, isLoading } = useFetchComments(pictureId)

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
    await postComment({
      ...params,
      body: body,
    })
    mutate()
  }

  return {
    isLoading,
    pictureComments,
    onSubmitComment,
  }
}
