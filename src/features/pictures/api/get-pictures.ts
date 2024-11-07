import { useQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { Picture } from '../types'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getPictures = async (): Promise<Picture[]> => {
  try {
    const response = await apiClient.get('/api/v1/pictures')
    const deserializer = new Deserializer(deserializerOptions)
    const pictures = await deserializer.deserialize(response.pictures)
    return pictures
  } catch (error) {
    console.error('画像一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getPicturesQueryOptions = (): UseQueryOptions<Picture[], Error> => {
  return {
    queryKey: ['pictures'],
    queryFn: getPictures,
  }
}

type UsePicturesOptions = {
  queryConfig?: QueryConfig<typeof getPictures>
}

export const usePictures = ({ queryConfig }: UsePicturesOptions = {}) => {
  return useQuery<Picture[], Error>({
    ...getPicturesQueryOptions(),
    ...queryConfig,
  })
}
