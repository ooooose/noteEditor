import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/api-client'

import { getCommentsQueryOptions } from './get-comments'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const deleteComment = ({
  pictureId,
  commentId,
}: {
  pictureId: number
  commentId: number
}) => {
  return apiClient.delete(`/api/v1/pictures/${pictureId}/comments/${commentId}`)
}

type UseDeleteCommentOptions = {
  pictureId: number
  mutationConfig?: MutationConfig<typeof deleteComment>
}

export const useDeleteComment = ({ pictureId, mutationConfig }: UseDeleteCommentOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCommentsQueryOptions(pictureId).queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteComment,
  })
}
