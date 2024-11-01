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

export const getUserPictures = async (userUid: string): Promise<Picture[]> => {
  try {
    const response = await apiClient.get(`/api/v1/users/${userUid}/pictures`)
    const deserializer = new Deserializer(deserializerOptions)
    const pictures = await deserializer.deserialize(response)
    return pictures
  } catch (error) {
    console.error('画像一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getUserPicturesQueryOptions = (userUid: string): UseQueryOptions<Picture[], Error> => {
  return {
    queryKey: ['user-pictures', userUid],
    queryFn: () => getUserPictures(userUid),
  }
}

type UseUserPicturesOptions = {
  userUid: string
  queryConfig?: QueryConfig<typeof getUserPictures>
}

export const useUserPictures = ({ userUid, queryConfig }: UseUserPicturesOptions) => {
  return useQuery<Picture[], Error>({
    ...getUserPicturesQueryOptions(userUid),
    ...queryConfig,
  })
}
