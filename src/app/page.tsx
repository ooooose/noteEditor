'use client'

import { AvatarImage, AvatarFallback, Avatar } from '@radix-ui/react-avatar'
import { Palette, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'

import MainLayout from '@/components/layouts/Layout/MainLayout'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
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
          <section className='grid gap-8'>
            <h2 className='text-center text-3xl font-bold'>みんなの作品ギャラリー</h2>
            <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-2'>
              {[1, 2, 3, 4].map((i) => (
                <Card
                  className='group overflow-hidden bg-white/50 transition-shadow hover:shadow-lg'
                  key={i}
                >
                  <div className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='size-10 rounded-lg shadow-sm'>
                          <AvatarImage className='rounded-full' src='/avatar.png' />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='text-sm font-semibold'>Aさん</div>
                          <p className='text-xs text-gray-500'>11/12</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mx-4'>
                    <div className='overflow-hidden'>
                      <div className='bg-white px-4 pb-4'>
                        <Image
                          alt='Picture'
                          className='rounded-lg'
                          height={200}
                          src='/TopImage.png'
                          width={300}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
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
  )
}
