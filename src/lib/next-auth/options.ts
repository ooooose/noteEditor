import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '../prisma'

import type { Adapter } from 'next-auth/adapters'

type ClientType = {
  clientId: string
  clientSecret: string
}

export const options: NextAuthOptions = {
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-expect-error
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user) {
          return null
        }
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword ?? '')

        if (!passwordsMatch) {
          return null
        }
        return user
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // @ts-expect-error
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user.emailVerified = token.emailVerified
      session.user.uid = token.uid
      return {
        ...session,
        user: {
          ...session.user,
        },
      }
    },
  },
}
