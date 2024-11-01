import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getUserLikedPicturesQueryOptions, getUserPicturesQueryOptions } from '@/features/user/api'
import { apiClient } from '@/lib/api/api-client'

import { getLikesQueryOptions } from './get-likes'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const createLike = async (paramas: { picture_uid: string }) => {
  return await apiClient.post('/api/v1/likes', paramas)
}

type UseCreateLikeOptions = {
  userUid?: string
  mutationConfig?: MutationConfig<typeof createLike>
}

export const useCreateLike = ({ userUid = undefined, mutationConfig }: UseCreateLikeOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries(getLikesQueryOptions().queryKey)
      if (userUid) {
        queryClient.invalidateQueries(getUserLikedPicturesQueryOptions(userUid).queryKey)
        queryClient.invalidateQueries(getUserPicturesQueryOptions(userUid).queryKey)
      }

      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createLike,
  })
}
