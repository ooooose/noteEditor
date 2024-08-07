import { NextResponse, NextRequest } from 'next/server'

import { prisma, main } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    await main()
    const user = await prisma.user.findFirst({
      where: { email: email },
      include: {
        likes: true,
      },
    })
    return NextResponse.json({ message: 'Success', user }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
