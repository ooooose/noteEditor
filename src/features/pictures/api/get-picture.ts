import { Deserializer } from 'jsonapi-serializer'

import { apiClient } from '@/lib/api/api-client'

import type { Picture } from '../types'
import type { DeserializerOptions } from 'jsonapi-serializer'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export const getPicture = async ({ pictureId }: { pictureId: string }): Promise<Picture> => {
  try {
    const response = await apiClient.get(`api/v1/pictures/${pictureId}`)
    const deserializer = new Deserializer(deserializerOptions)
    return deserializer.deserialize(response.data)
  } catch (error) {
    console.error('絵の取得に失敗しました:', error)
    throw error
  }
}
