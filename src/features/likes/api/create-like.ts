import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'
import { generateUUID } from '@/lib/uuid'

import { getLikesQueryOptions } from './get-likes'

import type { Like } from '../types'
import type { MutationConfig } from '@/lib/react-query/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const createLike = async (paramas: { pictureId: number }): Promise<Like> => {
  const uuid = generateUUID()
  const paramsWithUUID = { ...paramas, id: uuid }
  const response = await apiClient.post('/api/v1/likes', paramsWithUUID)
  const deserializer = new Deserializer(deserializerOptions)
  const like = await deserializer.deserialize(response.json())
  return like
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
