import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string
      accessToken?: string | undefined
    }
  }

  interface User {
    userId: string
    accessToken?: string | undefined
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    accessToken?: string | undefined
  }
}
