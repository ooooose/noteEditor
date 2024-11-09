import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { Picture } from '../types'
import type { Meta } from '@/types/api'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getPictures = async ({
  page = 1,
}: {
  page?: number
}): Promise<{ data: Picture[]; meta: Meta }> => {
  try {
    const response = await apiClient.get('/api/v1/pictures', {
      page: page,
    })
    const deserializer = new Deserializer(deserializerOptions)
    const pictures = await deserializer.deserialize(response.pictures)
    return { data: pictures, meta: response.pagy }
  } catch (error) {
    console.error('画像一覧の取得に失敗しました:', error)
    throw error
  }
}

export const getInfinitePicturesQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['pictures'],
    queryFn: ({ pageParam = 1 }) => {
      return getPictures({ page: pageParam as number })
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.last) return undefined
      const nextPage = lastPage.meta.page + 1
      return nextPage
    },
    initialPageParam: 1,
  })
}

export const useInfiniitePictures = () => {
  return useInfiniteQuery({
    ...getInfinitePicturesQueryOptions(),
  })
}
