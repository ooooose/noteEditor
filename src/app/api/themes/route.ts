import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// テーマ全取得API
export async function GET(req: Request, res: NextResponse) {
  try {
    await main()
    const themes = await prisma.theme.findMany()
    return NextResponse.json({ message: 'Success', themes }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
