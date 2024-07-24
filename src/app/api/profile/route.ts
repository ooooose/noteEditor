import { NextResponse, NextRequest } from 'next/server'

import { prisma, main } from '@/lib/prisma'
import { CONSTANTS } from '@/utils/constants'
import { uploadFile } from '@/utils/upload'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const image = formData.get('image') as File | null

  try {
    await main()

    let imageUrl: string | undefined

    if (image && image instanceof File) {
      if (image.size > CONSTANTS.MAX_FILE_SIZE) {
        throw new Error(CONSTANTS.ERROR_MESSAGES.FILE_TOO_LARGE)
      }

      const fileType = image.type.split('/')[1]
      const arrayBuffer = await image.arrayBuffer()
      const blob = new Blob([arrayBuffer], { type: image.type })

      imageUrl = await uploadFile(blob, id, name, fileType)
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: name,
        ...(imageUrl && { image: imageUrl }),
      },
    })

    return NextResponse.json({ message: 'Success', user }, { status: 200 })
  } catch (err) {
    console.error(CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, err)
    return NextResponse.json(
      { message: CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
