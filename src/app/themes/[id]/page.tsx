import React from 'react'

import ThemeLayout from '@/features/themes/components/ThemeLayout'

function Theme({ params }: { params: { id: string } }) {
  return (
    <div>
      <ThemeLayout id={params.id} />
    </div>
  )
}

export default Theme
