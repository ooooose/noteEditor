import { prisma, main } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, res: NextResponse) {
  try {
    await main()

    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ message: 'Success', comments }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(req: Request, res: NextResponse) {
  try {
    const { email, pictureId, body } = await req.json()
    await main()
    const user = await prisma.user.findUnique({
      where: { email: email },
    })
    const comment = await prisma.comment.create({
      data: {
        pictureId: pictureId,
        userId: user.id,
        commenterName: user.name,
        body: body,
      },
    })
    return NextResponse.json({ message: 'Success', comment }, { status: 201 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(req: Request, res: NextResponse) {
  try {
    const { id, body } = await req.json()
    await main()
    const comment = await prisma.comment.update({
      where: { id: id },
      data: { body: body },
    })
    return NextResponse.json({ message: 'Success', comment }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(req: Request, res: NextResponse) {
  try {
    const { id } = await req.json()
    await main()
    const comment = await prisma.comment.delete({
      where: { id: id },
    })
    return NextResponse.json({ message: 'Success', comment }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
