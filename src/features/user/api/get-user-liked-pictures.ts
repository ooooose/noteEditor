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

export const getUserLikedPictures = async (userUid: string): Promise<Picture[]> => {
  try {
    const response = await apiClient.get(`/api/v1/users/${userUid}/liked_pictures`)
    const deserializer = new Deserializer(deserializerOptions)
    const pictures = await deserializer.deserialize(response)
    return pictures
  } catch (error) {
    console.error('画像一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getUserLikedPicturesQueryOptions = (
  userUid: string,
): UseQueryOptions<Picture[], Error> => {
  return {
    queryKey: ['user-liked-pictures', userUid],
    queryFn: () => getUserLikedPictures(userUid),
  }
}

type UseUserLikedPicturesOptions = {
  userUid: string
  queryConfig?: QueryConfig<typeof getUserLikedPictures>
}

export const useUserLikedPictures = ({ userUid, queryConfig }: UseUserLikedPicturesOptions) => {
  return useQuery<Picture[], Error>({
    ...getUserLikedPicturesQueryOptions(userUid),
    ...queryConfig,
  })
}
