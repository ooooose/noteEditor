import { NextResponse } from 'next/server'

import { Like } from '@/features/likes/types'
import { prisma, main } from '@/lib/prisma'

export async function GET() {
  try {
    await main()

    const likes = (await prisma.like.findMany()) as Like[]
    return NextResponse.json({ message: 'Success', likes }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(req: Request) {
  try {
    const { email, pictureId } = await req.json()
    await main()
    const user = await prisma.user.findUnique({
      where: { email: email },
    })
    const like = (await prisma.like.create({
      data: {
        pictureId: pictureId,
        userId: user.id,
      },
    })) as Like[]
    return NextResponse.json({ message: 'Success', like }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(req: Request) {
  try {
    const { email, pictureId } = await req.json()
    await main()
    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    const like = (await prisma.like.delete({
      where: {
        userId_pictureId: {
          userId: user.id,
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
