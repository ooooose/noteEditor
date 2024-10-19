import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/api-client'

import { getCommentsQueryOptions } from './get-comments'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const deleteComment = async ({
  pictureUid,
  commentId,
}: {
  pictureUid: string
  commentId: number
}) => {
  return await apiClient.delete(`/api/v1/${pictureUid}/comments/${commentId}`)
}

type UseDeleteCommentOptions = {
  pictureUid: string
  mutationConfig?: MutationConfig<typeof deleteComment>
}

export const useDeleteComment = ({ pictureUid, mutationConfig }: UseDeleteCommentOptions) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries(getCommentsQueryOptions(pictureUid).queryKey)
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteComment,
  })
}
