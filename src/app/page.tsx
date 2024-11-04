'use client'

import { Palette, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'

import MainLayout from '@/components/layouts/Layout/MainLayout'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <>
      <MainLayout>
        <main className='flex w-[700px] flex-col items-center justify-between'>
          <div className='grid gap-12'>
            <section className='mt-8 grid gap-6 text-center'>
              <h1 className='my-10 grid gap-3 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                みんなで描こう
                <br />
                <span className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent'>
                  創造の世界へ
                </span>
              </h1>
              <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl'>
                テーマに沿って絵を描き、共有しよう。
                <br />
                あなたの想像力が、新しい世界を作り出します。
              </p>
            </section>

            <section className='mx-auto w-full max-w-2xl overflow-hidden rounded-xl border-8 border-amber-800 bg-amber-100 p-4 shadow-2xl'>
              <Image
                alt='Featured artwork'
                className='mx-auto mb-2'
                height={300}
                priority
                quality={50}
                src='/TopImage.png'
                width={400}
              />
              <div className='mx-auto w-2/3 rounded-md bg-white/80 p-4 backdrop-blur-sm'>
                <h2 className='text-lg font-semibold'>今月のテーマ: 「夏の思い出」</h2>
                <p className='text-sm text-gray-600'>あなたの夏の思い出を描いてみましょう！</p>
              </div>
            </section>

            <section className='grid gap-8'>
              <h2 className='text-center text-3xl font-bold'>みんなの作品ギャラリー</h2>
              <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-2'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    className='group relative overflow-hidden rounded-xl border-4 border-amber-800 bg-amber-100 p-2 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl'
                    key={i}
                  >
                    <Image
                      alt={`Artwork ${i}`}
                      className='mx-auto mb-2'
                      height={300}
                      priority
                      quality={50}
                      src={`/TopImage.png`}
                      width={300}
                    />
                    <div className='mx-auto mt-2 rounded-md bg-white/80 p-4 backdrop-blur-sm'>
                      <h2 className='font-semibold'>テーマ: 「夏の思い出」</h2>
                      <p className='text-sm text-gray-600'>
                        あなたの夏の思い出を描いてみましょう！
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className='grid gap-8'>
              <h2 className='text-center text-3xl font-bold'>画HACKの特徴</h2>
              <div className='grid gap-4 md:grid-cols-3'>
                <Card className='group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-lg'>
                  <div className='absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100' />
                  <Palette className='size-12 text-pink-500' />
                  <h3 className='mt-4 text-xl font-bold'>テーマで描く</h3>
                  <p className='mt-2 text-gray-500'>
                    日替わりのテーマに沿って、自由に絵を描こう。想像力の限界に挑戦しよう。
                  </p>
                </Card>
                <Card className='group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-lg'>
                  <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100' />
                  <Users className='size-12 text-purple-500' />
                  <h3 className='mt-4 text-xl font-bold'>みんなと共有</h3>
                  <p className='mt-2 text-gray-500'>
                    描いた絵をシェアして、他のユーザーと交流しよう。新しい発見があるかも。
                  </p>
                </Card>
                <Card className='group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-lg'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 transition-opacity group-hover:opacity-100' />
                  <Sparkles className='size-12 text-blue-500' />
                  <h3 className='mt-4 text-xl font-bold'>成長する喜び</h3>
                  <p className='mt-2 text-gray-500'>
                    毎日描くことで、自分の成長を実感しよう。新しいスキルが身につくはず。
                  </p>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </MainLayout>
    </>
  )
}
