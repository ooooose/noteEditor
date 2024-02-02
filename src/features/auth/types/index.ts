export type AuthUser = {
  name: string
  email: string
  image?: string
}

export type UserResponse = {
  jwt: string
  user: AuthUser
}
