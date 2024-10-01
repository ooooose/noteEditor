import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/api-client'

import { getLikesQueryOptions } from './get-likes'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const deleteLike = async ({ likeId }: { likeId: number }) => {
  return await apiClient.delete(`/api/likes/${likeId}`)
}

type UseDeleteLikeOptions = {
  mutationConfig?: MutationConfig<typeof deleteLike>
}

export const UseDeleteLike = ({ mutationConfig }: UseDeleteLikeOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getLikesQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteLike,
  })
}
