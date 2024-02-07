import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, res: NextResponse) {
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

export async function POST(req: Request, res: NextResponse) {
  try {
    const { email, pictureId } = await req.json()
    await main()
    const user = await prisma.user.findUnique({
      where: { email: email },
    })
    const like = await prisma.like.create({
      data: {
        pictureId: pictureId,
        userId: user.id,
      },
    })
    return NextResponse.json({ message: 'Success', like }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(req: Request, res: NextResponse) {
  try {
    const { email, pictureId } = await req.json()
    await main()
    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    const like = await prisma.like.delete({
      where: {
        userId_pictureId: {
          userId: user.id,
          pictureId: pictureId,
        },
      },
    })
    return NextResponse.json({ message: 'Success', like }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
