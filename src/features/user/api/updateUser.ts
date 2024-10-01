import { middleApiClient } from '@/lib/api/middle-api-client'

export const updateUser = async (params: FormData) => {
  return await middleApiClient
    .apiPostFormData('/api/profile', params)
    .then((result) => result.json())
}
