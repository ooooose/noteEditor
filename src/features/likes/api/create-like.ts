import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/api-client'

import { getLikesQueryOptions } from './get-likes'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const createLike = async (paramas: { picture_uid: string }) => {
  await apiClient.post('/api/v1/likes', paramas)
}

type UseCreateLikeOptions = {
  mutationConfig?: MutationConfig<typeof createLike>
}

export const useCreateLike = ({ mutationConfig }: UseCreateLikeOptions) => {
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
    mutationFn: createLike,
  })
}
