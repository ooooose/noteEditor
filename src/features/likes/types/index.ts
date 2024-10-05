import type { User } from '@/features/user/types'
import type { Entity } from '@/types/api'

export type Like = Entity<{
  pictureId: string
  userId: string
  user: User
}>
