import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// テーマ取得API
export async function GET(req: Request, res: NextResponse) {
  try {
    const id: string = req.url.split('/themes/')[1]
    await main()
    const theme = await prisma.theme.findFirst({ where: { id } })
    return NextResponse.json({ message: 'Success', theme }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// テーマ更新API
export async function PUT(req: Request, res: NextResponse) {
  try {
    const id: string = req.url.split('/themes/')[1]
    const { userId, title } = await req.json()
    await main()
    const theme = await prisma.theme.update({
      data: { title: title },
      where: { id: id, userId: userId },
    })
    return NextResponse.json({ message: 'Success', theme }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// テーマ削除API
export async function DELETE(req: Request, res: NextResponse) {
  try {
    const id: string = req.url.split('/themes/')[1]
    const { userId } = await req.json()
    await main()
    const theme = await prisma.theme.delete({
      where: { id: id, userId: userId },
    })
    return NextResponse.json({ message: 'Success', theme }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}