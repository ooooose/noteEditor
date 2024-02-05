import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// テーマ全取得API
export async function GET(req: Request, res: NextResponse) {
  try {
    await main()
    const themes = await prisma.theme.findMany({
      include: {
        pictures: true,
      },
    })
    return NextResponse.json({ message: 'Success', themes }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// テーマ作成API
export async function POST(req: Request, res: NextResponse) {
  try {
    const { title, userId } = await req.json()
    await main()
    const theme = await prisma.theme.create({
      data: {
        title,
        userId,
      },
    })
    return NextResponse.json({ message: 'Success', theme }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
