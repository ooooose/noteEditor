import { NextRequest, NextResponse } from 'next/server'

import { prisma, main } from '@/lib/prisma'

// Profileに表示するいいねしたPictures全取得API
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const pageIndex = searchParams.get('page') || '1'
  const id = searchParams.get('id')
  const take = 6
  try {
    await main()
    const skip = (parseInt(pageIndex, 10) - 1) * take

    const currentUser = await prisma.user.findUnique({
      where: {
        id: id ?? '',
      },
    })

    const pictures = await prisma.picture.findMany({
      include: {
        theme: true,
        user: true,
        likes: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      where: {
        likes: {
          some: {
            userId: currentUser.id,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    })

    return NextResponse.json({ pictures }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
