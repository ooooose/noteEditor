import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { apiClient } from '@/lib/api/api-client'

import { getInfinitePicturesQueryOptions } from './get-pictures'

import type { MutationConfig } from '@/lib/react-query/react-query'

type CreatePictureParams = {
  image_url: string
  title: string
}

export const createPicture = async (params: CreatePictureParams) => {
  try {
    await apiClient.post('/api/v1/pictures', params)
  } catch (error) {
    console.error('画像の投稿に失敗しました:', error)
    throw error
  }
}

type UsePostPictureOptions = {
  mutationConfig?: MutationConfig<typeof createPicture>
}

export const useCreatePicture = ({ mutationConfig }: UsePostPictureOptions = {}) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfinitePicturesQueryOptions().queryKey,
      })
      onSuccess?.(data, ...args)
      router.push('/timeline')
    },
    ...restConfig,
    mutationFn: createPicture,
  })
}
