import { NextResponse } from 'next/server'

import { Comment } from '@/features/comments/types'
import { prisma, main } from '@/lib/prisma'

export async function GET() {
  try {
    await main()

    const comments = (await prisma.comment.findMany({
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

export async function POST(req: Request) {
  try {
    const { userId, userName, pictureId, body } = await req.json()
    await main()
    const comment = await prisma.comment.create({
      data: {
        pictureId: pictureId,
        userId: userId,
        commenterName: userName,
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

export async function PUT(req: Request) {
  try {
    const { id, body } = await req.json()
    await main()
    const comment = (await prisma.comment.update({
      where: { id: id },
      data: { body: body },
    })) as Comment
    return NextResponse.json({ message: 'Success', comment }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    await main()
    const comment = (await prisma.comment.delete({
      where: { id: id },
    })) as Comment
    return NextResponse.json({ message: 'Success', comment }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// export const runtime = 'edge'
