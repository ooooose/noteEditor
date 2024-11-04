'use client'

import { ArrowLeft, RefreshCcw, Palette, Bug } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Error() {
  return (
    <div className='min-h-screen bg-[#f8f5f0]'>
      <div className='container flex min-h-screen flex-col items-center justify-center'>
        <Card className='relative mx-auto w-full max-w-md overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10' />
          <div className='relative p-6'>
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex items-center justify-center rounded-full bg-red-100 p-3'>
                <Bug className='size-6 text-red-600' />
              </div>
              <h1 className='mb-2 text-2xl font-bold'>エラーが発生しました</h1>
              <p className='mb-6 text-gray-500'>
                申し訳ありません。予期せぬエラーが発生しました。
                <br />
                しばらく時間をおいて再度お試しください。
              </p>
              <div className='flex w-full flex-col gap-2 sm:flex-row sm:justify-center'>
                <Button
                  className='gap-2'
                  onClick={() => window.location.reload()}
                  variant='default'
                >
                  <RefreshCcw className='size-4' />
                  再試行
                </Button>
                <Button asChild className='gap-2' variant='outline'>
                  <Link href='/'>
                    <ArrowLeft className='size-4' />
                    トップに戻る
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-500'>
            エラーが続く場合は
            <Link className='text-primary hover:underline' href='/contact'>
              お問い合わせ
            </Link>
            ください
          </p>
        </div>

        <div className='fixed bottom-4 right-4'>
          <Button
            className='gap-2'
            onClick={() => document.documentElement.classList.toggle('dark')}
            size='sm'
            variant='outline'
          >
            <Palette className='size-4' />
            テーマ切替
          </Button>
        </div>
      </div>
    </div>
  )
}
