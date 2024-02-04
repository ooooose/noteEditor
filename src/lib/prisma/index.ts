import { PrismaClient } from '@prisma/client'
export * from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function main() {
  try {
    await prisma.$connect()
  } catch (err) {
    return Error('DBの接続に失敗しました。')
  }
}
