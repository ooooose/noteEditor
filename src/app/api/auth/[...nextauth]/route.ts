import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'

import { options } from '@/lib/next-auth/options'

const handler = NextAuth(options) as AuthOptions

export { handler as GET, handler as POST }
