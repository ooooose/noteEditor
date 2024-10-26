import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'
import { QueryConfig } from '@/lib/react-query/react-query'

import { User } from '../types'

import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get('/api/v1/users/me')
    const deserializer = new Deserializer(deserializerOptions)
    const diary = await deserializer.deserialize(response)
    return diary
  } catch (error) {
    console.error('ログインユーザーの取得に失敗しました:', error)
    throw error
  }
}

export const getUserQueryOptions = (): UseQueryOptions<User, Error> => {
  return {
    queryKey: ['currentUser'],
    queryFn: () => getUser(),
  }
}

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUser>
}

export const useUser = ({ queryConfig }: UseUserOptions) => {
  return useQuery<User, Error>({
    ...getUserQueryOptions(),
    ...queryConfig,
  })
}
