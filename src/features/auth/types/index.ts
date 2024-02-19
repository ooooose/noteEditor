import { Like } from '@/features/likes/types'

export type AuthUser = {
  id: string
  name: string
  email: string
  image?: string
  likes: Like[]
}

export type UserResponse = {
  jwt: string
  user: AuthUser
}
