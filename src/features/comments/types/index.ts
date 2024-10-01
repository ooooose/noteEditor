import type { Entity } from '@/types/api'

export type Comment = Entity<{
  pictureId: string
  userId: string
  body: string
}>
