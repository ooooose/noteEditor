'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter()
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <Button onClick={() => router.push('/')} variant='default'>
        トップに戻る
      </Button>
      <Button onClick={() => reset()} variant='outline'>
        再試行
      </Button>
    </div>
  )
}
