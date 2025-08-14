'use client'
import { Palette, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

import { Login } from '@/features/auth/components'
import { TopPictures } from '@/features/top/components/top-pictures'
import { TopUsers } from '@/features/top/components/top-users'

const Main = () => {
  const { status } = useSession()
  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='grid gap-12'>
        <section className='my-8 grid w-[900px] gap-6 text-center'>
          <h1 className='my-10 grid gap-3 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
            <span className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent'>
              エモい絵、描こうよ！
            </span>
          </h1>
          <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl'>
            テーマに沿って絵を描き、共有しよう。
            <br />
            描いた絵は額縁で飾ることができます。
          </p>
        </section>
        <section className='grid w-[900px] gap-8'>
          <h2 className='text-center text-3xl font-bold'>みんなの作品ギャラリー</h2>
          <TopPictures />
        </section>
        <section>
          {status === 'authenticated' ? (
            <div className='flex items-center justify-center'>
              <Link className='text-blue-500' href='/timeline'>
                作品をもっと見る →
              </Link>
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              <Dialog>
                <DialogTrigger className='cursor-pointer text-blue-500'>
                  作品をもっと見る →
                </DialogTrigger>
                <DialogContent className='text-center sm:max-w-[425px]'>
                  <DialogHeader>
                    <h2 className='text-xl font-bold'>ログインが必要です</h2>
                  </DialogHeader>
                  <DialogDescription>
                    <p className='mb-4'>
                      利用規約・プライバシーポリシーに同意の上、
                      <br />
                      ログインしてください。
                    </p>
                    <Login />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </section>
        <section className='grid w-[900px] gap-8'>
          <h2 className='text-center text-3xl font-bold'>トップクリエイター</h2>
          <TopUsers />
        </section>

        <section className='grid w-[900px] gap-8'>
          <h2 className='text-center text-3xl font-bold'>画HACKの特徴</h2>
          <div className='grid gap-4 md:grid-cols-3'>
            <Card className='group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-lg'>
              <div className='absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100' />
              <Palette className='size-12 text-pink-500' />
              <h3 className='mt-4 text-xl font-bold'>テーマで描く</h3>
              <p className='mt-2 text-gray-500'>
                テーマに沿って絵を描きましょう。 新たにテーマを設定することもできます。
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
              <h3 className='mt-4 text-xl font-bold'>描く喜び</h3>
              <p className='mt-2 text-gray-500'>
                毎日描くことで、自分の創造力が高まります。楽しみながら描いてみましょう。
              </p>
            </Card>
          </div>
        </section>
        <section className='mx-auto mt-8 w-[600px]'>
          <Card className='flex justify-between p-8 text-center'>
            <div>
              <p className='text-left'>
                あなただけの絵を描いて <br />
                アプリの中に飾りましょう！
              </p>
              <div className='mt-8 flex items-start'>
                {status === 'loading' ? (
                  <Skeleton className='h-[38px] w-[140px]' />
                ) : status === 'authenticated' ? (
                  <Link href='/canvas' passHref>
                    <Button variant='outline'>絵を描きに行く</Button>
                  </Link>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild className='cursor-pointer'>
                      <Button variant='outline'>ログインして始める</Button>
                    </DialogTrigger>
                    <DialogContent className='text-center sm:max-w-[425px]'>
                      <DialogHeader>
                        <h2 className='text-xl font-bold'>ログインしますか？</h2>
                      </DialogHeader>
                      <DialogDescription>
                        <p className='mb-4'>
                          利用規約・プライバシーポリシーに同意の上、
                          <br />
                          ログインしてください。
                        </p>
                        <Login />
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            <div>
              <Image
                alt='サンプル画像'
                className='size-auto'
                height={240}
                priority
                src='/firstTopIcon.png'
                width={240}
              />
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default Main
