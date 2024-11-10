import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getInfiniteUserLikedPicturesQueryOptions,
  getInfiniteUserPicturesQueryOptions,
} from '@/features/user/api'
import { apiClient } from '@/lib/api/api-client'

import { getLikesQueryOptions } from './get-likes'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const deleteLike = async ({ picture_uid }: { picture_uid: string }) => {
  return await apiClient.delete(`/api/v1/likes/${picture_uid}`)
}

type UseDeleteLikeOptions = {
  userUid?: string
  mutationConfig?: MutationConfig<typeof deleteLike>
}

export const useDeleteLike = ({ userUid = undefined, mutationConfig }: UseDeleteLikeOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getLikesQueryOptions().queryKey })
      if (userUid) {
        queryClient.invalidateQueries({
          queryKey: getInfiniteUserLikedPicturesQueryOptions(userUid).queryKey,
        })
        queryClient.invalidateQueries({
          queryKey: getInfiniteUserPicturesQueryOptions(userUid).queryKey,
        })
      }
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteLike,
  })
}
