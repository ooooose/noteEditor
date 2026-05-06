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

export const getPicture = async ({ pictureId }: { pictureId: string }): Promise<Picture> => {
  try {
    const response = await apiClient.get(`api/v1/pictures/${pictureId}`)
    const deserializer = new Deserializer(deserializerOptions)
    const picture = await deserializer.deserialize(response)
    return picture
  } catch (error) {
    console.error('絵の取得に失敗しました:', error)
    throw error
  }
}

export const getPictureQueryOptions = (pictureId: string): UseQueryOptions<Picture, Error> => {
  return {
    queryKey: ['picture', pictureId],
    queryFn: () => getPicture({ pictureId }),
    enabled: Boolean(pictureId),
  }
}

type UsePictureOptions = {
  pictureId?: string
  queryConfig?: QueryConfig<typeof getPicture>
}

export const usePicture = ({ pictureId, queryConfig }: UsePictureOptions = {}) => {
  return useQuery<Picture, Error>({
    ...getPictureQueryOptions(pictureId ?? ''),
    ...queryConfig,
  })
}
