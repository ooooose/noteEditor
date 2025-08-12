import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getInfiniteUserLikedPicturesQueryOptions,
  getInfiniteUserPicturesQueryOptions,
} from '@/features/user/api'
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
      ;[
        getLikesQueryOptions().queryKey,
        userUid && getInfiniteUserLikedPicturesQueryOptions(userUid).queryKey,
        userUid && getInfiniteUserPicturesQueryOptions(userUid).queryKey,
      ]
        .filter(Boolean)
        .forEach((key) => queryClient.invalidateQueries({ queryKey: key! }))

      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createLike,
  })
}
