import React from 'react'

import { ThemeLayout } from '@/features/themes/components/ThemeLayout'

function Theme({ params }: { params: { id: string } }) {
  return <ThemeLayout id={params.id} />
}

export default Theme
