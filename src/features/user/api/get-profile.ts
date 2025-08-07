import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'
import { QueryConfig } from '@/lib/react-query/react-query'

import { User } from '../types'

import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getProfile = async (): Promise<User> => {
  try {
    const response = await apiClient.get('/api/v1/users/me')
    const deserializer = new Deserializer(deserializerOptions)
    const user = await deserializer.deserialize(response)
    return user
  } catch (error) {
    console.error('ログインユーザーの取得に失敗しました:', error)
    throw error
  }
}

export const getProfileQueryOptions = (): UseQueryOptions<User, Error> => {
  return {
    queryKey: ['currentUser'],
    queryFn: () => getProfile(),
  }
}

type UseProfileOptions = {
  queryConfig?: QueryConfig<typeof getProfile>
}

export const useProfile = ({ queryConfig }: UseProfileOptions) => {
  return useQuery<User, Error>({
    ...getProfileQueryOptions(),
    ...queryConfig,
  })
}
