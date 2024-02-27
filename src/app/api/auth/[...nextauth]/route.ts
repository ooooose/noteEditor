import NextAuth from 'next-auth/next'

import { options } from '@/lib/next-auth/options'

export const runtime = 'edge'

const handler = NextAuth(options)

export { handler as GET, handler as POST }
