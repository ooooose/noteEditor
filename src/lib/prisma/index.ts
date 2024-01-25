import { PrismaClient } from '@prisma/client'
export * from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
})

export async function main() {
  try {
    await prisma.$connect()
  } catch (err) {
    return Error('DBの接続に失敗しました。')
  }
}
