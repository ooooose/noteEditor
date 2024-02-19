import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      uid: string
      emailVerified?: boolean
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string
    emailVerified: boolean
  }
}
