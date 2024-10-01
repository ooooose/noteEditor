import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'
import { useRouter } from 'next/navigation'

import { apiClient } from '@/lib/api/api-client'

import { getPicturesQueryOptions } from './get-pictures'

import type { Picture } from '../types'
import type { MutationConfig } from '@/lib/react-query/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

type CreatePictureParams = {
  image: string
  themeId: number
  userId: number
  uid: string
}

export const createPicture = async (params: CreatePictureParams) => {
  try {
    const response = await apiClient.post('/api/v1/pictures', params)
    const deserializer = new Deserializer(deserializerOptions)
    const picture: Picture = await deserializer.deserialize(response.json())
    return picture
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
        queryKey: getPicturesQueryOptions().queryKey,
      })
      onSuccess?.(data, ...args)
      router.push('/timeline')
    },
    ...restConfig,
    mutationFn: createPicture,
  })
}
