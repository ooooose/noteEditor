import { useQuery } from '@tanstack/react-query'
import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { User } from '@/features/user/types'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getTopUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get(`/api/v1/users/top`)
    const deserializer = new Deserializer(deserializerOptions)
    const users: User[] = await deserializer.deserialize(response)
    return users
  } catch (error) {
    console.error('ユーザーの取得に失敗しました:', error)
    throw error
  }
}

export const getTopUsersQueryOptions = (): UseQueryOptions<User[], Error> => {
  return {
    queryKey: ['topPictures'],
    queryFn: getTopUsers,
  }
}

type UseTopUsersOptions = {
  queryConfig?: QueryConfig<typeof getTopUsers>
}

export const useTopUsers = ({ queryConfig }: UseTopUsersOptions) => {
  return useQuery<User[], Error>({
    ...getTopUsersQueryOptions(),
    ...queryConfig,
  })
}
