import { useQuery } from '@tanstack/react-query'
import { Deserializer, type DeserializerOptions } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { Theme } from '../types'
import type { QueryConfig } from '@/lib/react-query/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getThemes = async (): Promise<Theme[]> => {
  try {
    const response = await apiClient.get('/api/v1/themes')
    const deserialize = new Deserializer(deserializerOptions)
    const themes = deserialize.deserialize(response)
    return themes
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch themes')
  }
}

export const getThemesQueryOptions = (): UseQueryOptions<Theme[], Error> => {
  return {
    queryKey: ['themes'],
    queryFn: getThemes,
  }
}

type UseThemesOptions = {
  queryConfig?: QueryConfig<typeof getThemes>
}

export const useThemes = ({ queryConfig }: UseThemesOptions = {}) => {
  return useQuery<Theme[], Error>({
    ...getThemesQueryOptions(),
    ...queryConfig,
  })
}
