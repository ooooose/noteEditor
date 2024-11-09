import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { Picture } from '@/features/pictures/types'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { Meta } from '@/types/api'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getUserPictures = async ({
  userUid,
  page = 1,
}: {
  userUid: string
  page?: number
}): Promise<{ data: Picture[]; meta: Meta }> => {
  try {
    const response = await apiClient.get(`/api/v1/users/${userUid}/pictures`, { page: page })
    const deserializer = new Deserializer(deserializerOptions)
    const pictures = await deserializer.deserialize(response.pictures)
    return { data: pictures, meta: response.pagy }
  } catch (error) {
    console.error('画像一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getInfiniteUserPicturesQueryOptions = (userUid: string) => {
  return infiniteQueryOptions({
    queryKey: ['pictures'],
    queryFn: ({ pageParam = 1 }) => {
      return getUserPictures({ userUid: userUid, page: pageParam as number })
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.last) return undefined
      const nextPage = lastPage.meta.page + 1
      return nextPage
    },
    initialPageParam: 1,
  })
}

type UseInfiniteUserPicturesOptions = {
  userUid: string
  queryConfig?: QueryConfig<typeof getUserPictures>
}

export const useInfiniteUserPictures = ({
  userUid,
  queryConfig,
}: UseInfiniteUserPicturesOptions) => {
  return useInfiniteQuery({
    ...getInfiniteUserPicturesQueryOptions(userUid),
    ...queryConfig,
  })
}
