import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { Adapter } from 'next-auth/adapters'
import { auth } from '../firebase/admin'

type ClientType = {
  clientId: string
  clientSecret: string
}

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    } as ClientType),
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      authorize: async ({ idToken }: any, _req) => {
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken)
            return { ...decoded }
          } catch (err) {
            console.error(err)
          }
        }
        return null
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user.emailVerified = token.emailVerified
      session.user.uid = token.uid
      return session
    },
  },
}
