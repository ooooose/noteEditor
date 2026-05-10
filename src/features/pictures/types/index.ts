import type { Comment } from '@/features/comments/types'
import type { Like } from '@/features/likes/types'
import type { Theme } from '@/features/themes/types'
import type { User } from '@/features/user/types'
import type { Entity } from '@/types/api'

export type Picture = Entity<{
  imageUrl: string
  ogpImageUrl: string | null
  frameId: number
  uid: string
  userId: number
  theme: Theme
  likes: Like[]
  user: User
  comments: Comment[]
}>
