import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/api-client'
import { MutationConfig } from '@/lib/react-query/react-query'

import { getInfinitePicturesQueryOptions } from './get-pictures'

type updatePictureParams = {
  id: number
  frameId: number
}

export const updatePicture = ({ id, frameId }: updatePictureParams) => {
  return apiClient.put(`/api/v1/pictures/${id}`, { frameId })
}

type UseUpdatePictureOptions = {
  mutationConfig?: MutationConfig<typeof updatePicture>
}

export const useUpdatePicture = ({ mutationConfig }: UseUpdatePictureOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfinitePicturesQueryOptions().queryKey,
      })
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updatePicture,
  })
}
