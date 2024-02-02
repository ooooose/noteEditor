import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// テーマ作成API
export async function POST(req: Request, res: NextResponse) {
  try {
    const { email } = await req.json()
    await main()
    const user = await prisma.user.findFirst({
      where: { email: email },
    })
    return NextResponse.json({ message: 'Success', user }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
