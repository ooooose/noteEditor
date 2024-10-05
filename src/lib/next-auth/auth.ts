import { apiClient } from '../api/api-client'

import type { User } from '@/features/user/types'

export const getUser = async (): Promise<User> => {
  const response = await apiClient.get('/api/v1/me')
  const user: User = await response.json()
  return user
}
