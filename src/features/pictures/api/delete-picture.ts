import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getInfiniteUserLikedPicturesQueryOptions,
  getInfiniteUserPicturesQueryOptions,
} from '@/features/user/api'
import { apiClient } from '@/lib/api/api-client'

import { getInfinitePicturesQueryOptions } from './get-pictures'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const deletePicture = async ({ pictureId }: { pictureId: number }) => {
  return await apiClient.delete(`/api/v1/pictures/${pictureId}`).then((result) => result)
}

type UseDeletePictureOptions = {
  userUid?: string
  mutationConfig?: MutationConfig<typeof deletePicture>
}

export const useDeletePicture = ({ userUid, mutationConfig }: UseDeletePictureOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfinitePicturesQueryOptions().queryKey,
      })
      if (userUid) {
        queryClient.invalidateQueries({
          queryKey: getInfiniteUserLikedPicturesQueryOptions(userUid).queryKey,
        })
        queryClient.invalidateQueries({
          queryKey: getInfiniteUserPicturesQueryOptions(userUid).queryKey,
        })
      }

      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: deletePicture,
  })
}
