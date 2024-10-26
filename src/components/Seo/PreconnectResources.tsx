'use client'

import ReactDOM from 'react-dom'

export function PreconnectResources() {
  ReactDOM.preconnect(`${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}`)
  return null
}
