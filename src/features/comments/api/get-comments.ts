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

export const getComments = async (pictureUid: string): Promise<Comment[]> => {
  try {
    const response = await apiClient.get(`/api/v1/pictures/${pictureUid}/comments`)
    const deserializer = new Deserializer(deserializerOptions)
    const comments: Comment[] = await deserializer.deserialize(response)
    return comments
  } catch (error) {
    console.error('コメント一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getCommentsQueryOptions = (pictureUid: string): UseQueryOptions<Comment[], Error> => {
  return {
    queryKey: ['comments'],
    queryFn: () => getComments(pictureUid),
  }
}

type UseCommentsOptions = {
  pictureUid: string
  queryConfig?: QueryConfig<typeof getComments>
}

export const useComments = ({ pictureUid, queryConfig }: UseCommentsOptions) => {
  return useQuery<Comment[], Error>({
    ...getCommentsQueryOptions(pictureUid),
    ...queryConfig,
  })
}
