import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// テーマ取得API
export async function GET(req: Request, res: NextResponse) {
  try {
    const id: string = req.url.split('/pictures/')[1]
    await main()
    const picture = await prisma.picture.findFirst({
      where: { id },
      include: {
        theme: true,
      },
    })
    return NextResponse.json({ message: 'Success', picture }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
