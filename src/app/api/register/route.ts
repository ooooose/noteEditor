import { PrismaClient } from '@prisma/client/edge'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body.data
  if (!name || !email || !password) {
    return new NextResponse('入力に不備があります', { status: 400 })
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (exist) {
    return new NextResponse('既に存在しているユーザーです', { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      emailVerified: new Date(),
    },
  })

  return NextResponse.json(user, { status: 201 })
}
