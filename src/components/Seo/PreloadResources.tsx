'use client'

import ReactDOM from 'react-dom'

type PreloadResourcesProps = {
  src: string
}

export function PreloadResources({ src }: PreloadResourcesProps) {
  ReactDOM.preload(src, { as: 'image' })
  return null
}
