import { NextResponse } from 'next/server'

import { Like } from '@/features/likes/types'
import { prisma, main } from '@/lib/prisma'

export async function GET() {
  try {
    await main()

    const likes = await prisma.like.findMany()
    return NextResponse.json({ message: 'Success', likes }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(req: Request) {
  try {
    const { userId, pictureId } = await req.json()
    await main()
    const like = await prisma.like.create({
      data: {
        pictureId: pictureId,
        userId: userId,
      },
    })
    return NextResponse.json({ message: 'Success', like }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, pictureId } = await req.json()
    await main()

    const like = (await prisma.like.delete({
      where: {
        userId_pictureId: {
          userId: userId,
          pictureId: pictureId,
        },
      },
    })) as Like
    return NextResponse.json({ message: 'Success', like }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
