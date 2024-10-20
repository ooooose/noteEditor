import { useQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { Comment } from '../types'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getComments = async (pictureId: number): Promise<Comment[]> => {
  try {
    const response = await apiClient.get(`/api/v1/pictures/${pictureId}/comments`)
    const deserializer = new Deserializer(deserializerOptions)
    const comments: Comment[] = await deserializer.deserialize(response)
    return comments
  } catch (error) {
    console.error('コメント一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getCommentsQueryOptions = (pictureId: number): UseQueryOptions<Comment[], Error> => {
  return {
    queryKey: ['comments', pictureId],
    queryFn: () => getComments(pictureId),
  }
}

type UseCommentsOptions = {
  pictureId: number
  queryConfig?: QueryConfig<typeof getComments>
}

export const useComments = ({ pictureId, queryConfig }: UseCommentsOptions) => {
  return useQuery<Comment[], Error>({
    ...getCommentsQueryOptions(pictureId),
    ...queryConfig,
  })
}
