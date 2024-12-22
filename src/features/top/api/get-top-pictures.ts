import { useQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { Picture } from '@/features/pictures/types'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getTopPictures = async (): Promise<Picture[]> => {
  try {
    const response = await apiClient.get(`/api/v1/pictures/top`)
    const deserializer = new Deserializer(deserializerOptions)
    const pictures: Picture[] = await deserializer.deserialize(response)
    return pictures
  } catch (error) {
    console.error('絵の取得に失敗しました:', error)
    throw error
  }
}

export const getTopPicturesQueryOptions = (): UseQueryOptions<Picture[], Error> => {
  return {
    queryKey: ['topPictures'],
    queryFn: getTopPictures,
  }
}

type UseTopPicturesOptions = {
  queryConfig?: QueryConfig<typeof getTopPictures>
}

export const useTopPictures = ({ queryConfig }: UseTopPicturesOptions) => {
  return useQuery<Picture[], Error>({
    ...getTopPicturesQueryOptions(),
    ...queryConfig,
  })
}
