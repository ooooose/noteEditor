import React from 'react'
import { PictureLayout } from '@/features/pictures/components/PictureLayout'

function Picutre({ params }: { params: { id: string } }) {
  return <PictureLayout id={params.id} />
}

export default Picutre
