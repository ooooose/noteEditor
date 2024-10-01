import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/api-client'

import { getCommentsQueryOptions } from './get-comments'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  return await apiClient.delete(`/api/v1/comments/${commentId}`)
}

type UseDeleteCommentOptions = {
  mutationConfig?: MutationConfig<typeof deleteComment>
}

export const UseDeleteComment = ({ mutationConfig }: UseDeleteCommentOptions = {}) => {
  const queryClient = useQueryClient()
  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries(getCommentsQueryOptions().queryKey)
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteComment,
  })
}
