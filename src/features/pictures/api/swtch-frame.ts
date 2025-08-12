import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getInfiniteUserLikedPicturesQueryOptions,
  getInfiniteUserPicturesQueryOptions,
} from '@/features/user/api'
import { apiClient } from '@/lib/api/api-client'
import { MutationConfig } from '@/lib/react-query/react-query'

import { getInfinitePicturesQueryOptions } from './get-pictures'

type SwitchFrameParams = {
  id: number
  frame_id: number
}

export const switchFrame = ({ id, frame_id }: SwitchFrameParams) => {
  return apiClient.put(`/api/v1/pictures/${id}/switch_frame`, { frame_id })
}

type UseSwitchFrameOptions = {
  userUid?: string
  mutationConfig?: MutationConfig<typeof switchFrame>
}

export const useSwitchFrame = ({ userUid, mutationConfig }: UseSwitchFrameOptions = {}) => {
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
    mutationFn: switchFrame,
  })
}
