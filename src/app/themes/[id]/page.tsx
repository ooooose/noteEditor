import ThemeLayout from '@/features/themes/components/ThemeLayout'

export const runtime = 'edge'

function Theme({ params }: { params: { id: string } }) {
  return (
    <div>
      <ThemeLayout id={params.id} />
    </div>
  )
}

export default Theme
