import { NextResponse } from 'next/server'

import { prisma, main } from '@/lib/prisma'

// テーマ全取得API
export async function GET() {
  try {
    await main()
    const data = await prisma.theme.findMany({
      include: {
        pictures: true,
      },
    })
    // 以下型定義は見直すべき
    const themes = data.filter((theme: any) => theme.pictures && theme.pictures.length > 0)
    return NextResponse.json({ message: 'Success', themes }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// テーマ作成API
export async function POST(req: Request) {
  try {
    const { email, title } = await req.json()
    await main()

    const user = await prisma.user.findUnique({
      where: { email: email },
    })
    const theme = await prisma.theme.create({
      data: {
        title: title,
        userId: user.id,
      },
    })
    return NextResponse.json({ message: 'Success', theme }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
