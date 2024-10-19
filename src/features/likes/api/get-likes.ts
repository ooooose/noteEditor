import { useQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { QueryConfig } from '@/lib/react-query/react-query'
import type { Like } from '@prisma/client'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getLikes = async (): Promise<Like[]> => {
  try {
    const response = await apiClient.get('/api/v1/likes')
    const deserializer = new Deserializer(deserializerOptions)
    const likes: Like[] = await deserializer.deserialize(response.json())
    return likes
  } catch (error) {
    console.error('いいね一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getLikesQueryOptions = (): UseQueryOptions<Like[], Error> => {
  return {
    queryKey: ['likes'],
    queryFn: getLikes,
  }
}

type UseLikesOptions = {
  queryConfig?: QueryConfig<typeof getLikes>
}

export const useLikes = ({ queryConfig }: UseLikesOptions = {}) => {
  return useQuery<Like[], Error>({
    ...getLikesQueryOptions(),
    ...queryConfig,
  })
}
