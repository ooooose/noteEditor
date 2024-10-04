import { User } from '@/features/user/types'

import type { Entity } from '@/types/api'

export type Comment = Entity<{
  pictureId: number
  userId: number
  body: string
  user: User
}>
