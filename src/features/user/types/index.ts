import type { Entity } from '@/types/api'

export type User = Entity<{
  uid: string
  name: string
  email: string
  image: string
}>
