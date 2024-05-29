import { NextResponse } from 'next/server'

import { Comment } from '@/features/comments/types'
import { prisma, main } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { pictureId: string } }) {
  const { pictureId } = params

  try {
    await main()

    const comments = (await prisma.comment.findMany({
      where: {
        pictureId: pictureId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })) as Comment[]
    return NextResponse.json({ message: 'Success', comments }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
