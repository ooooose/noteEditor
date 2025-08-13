import { Deserializer } from 'jsonapi-serializer'
import { ImageResponse } from 'next/og'

import { Picture as PictureComponent } from '@/features/pictures/components/Picture'
import { Picture } from '@/features/pictures/types'
import { apiClient } from '@/lib/api/api-client'

import type { DeserializerOptions } from 'jsonapi-serializer'

export const runtime = 'edge'

const deserializerOptions: DeserializerOptions = {
  keyForAttribute: 'camelCase',
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pictureUid = searchParams.get('pictureId')
  if (!pictureUid) {
    return new Response('pictureId is required', { status: 400 })
  }

  try {
    const response = await apiClient.get(`/api/v1/pictures/${pictureUid}`)
    const deserializer = new Deserializer(deserializerOptions)
    const picture: Picture = await deserializer.deserialize(response)
    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
          }}
        >
          <PictureComponent
            author={picture.user.name}
            frameId={picture.frameId}
            src={picture.imageUrl}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (err) {
    return new Response('OGP fetch error', { status: 500 })
  }
}
