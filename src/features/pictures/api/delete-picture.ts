import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/lib/api/api-client'

import { getInfinitePicturesQueryOptions } from './get-pictures'

import type { MutationConfig } from '@/lib/react-query/react-query'

export const deletePicture = async ({ pictureId }: { pictureId: number }) => {
  return await apiClient.delete(`/api/v1/pictures/${pictureId}`).then((result) => result)
}

type UseDeletePictureOptions = {
  mutationConfig?: MutationConfig<typeof deletePicture>
}

export const UseDeletePicture = ({ mutationConfig }: UseDeletePictureOptions = {}) => {
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
    mutationFn: deletePicture,
  })
}
