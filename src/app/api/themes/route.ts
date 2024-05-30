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

    const themes = data.filter((theme: any) => theme.pictures && theme.pictures.length > 0)

    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
    return NextResponse.json({ message: 'Success', themes, randomTheme }, { status: 200 })
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
