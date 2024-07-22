import { NextResponse, NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'
import { CONSTANTS } from '@/utils/constants'
import { uploadFile } from '@/utils/upload'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const image = formData.get('image') as Blob | null

  if (!id || !name) {
    return NextResponse.json({ message: CONSTANTS.ERROR_MESSAGES.INVALID_INPUT }, { status: 400 })
  }

  try {
    let imageUrl: string | undefined

    if (image) {
      if (image.size > CONSTANTS.MAX_FILE_SIZE) {
        throw new Error(CONSTANTS.ERROR_MESSAGES.FILE_TOO_LARGE)
      }
      imageUrl = await uploadFile(image, id, name)
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        ...(imageUrl && { image: imageUrl }),
      },
    })

    return NextResponse.json({ message: 'Success', user }, { status: 200 })
  } catch (err) {
    console.error(CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, err)
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 })
    }
    return NextResponse.json(
      { message: CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: 500 },
    )
  }
}
