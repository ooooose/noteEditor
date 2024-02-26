'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
  ReactDOM.preconnect(`${process.env.IMAGE_HOST_URL}`, { crossOrigin: 'use-credentials' })

  return null
}
