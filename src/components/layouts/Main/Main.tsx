'use client'
import { Palette, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

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
import { getPicture } from '@/features/pictures/api'
import QuizModal from '@/features/pictures/components/QuizModal'
import { TopPictures } from '@/features/top/components/top-pictures'
import { baseURL } from '@/lib/constants/env'

import type { Picture } from '@/features/pictures/types'

const Main = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pictureId = searchParams.get('pictureId')
  const [picture, setPicture] = useState<Picture | null>(null)
  const [isModalOpan, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (pictureId) {
      getPicture({ pictureId }).then((res) => {
        setPicture(res)
        setIsModalOpen(true)
      })
    }
  }, [pictureId])

  const onOpenChange = () => {
    router.replace(baseURL)
    setIsModalOpen(false)
  }

  const { status } = useSession()

  return (
    <main className='flex w-full flex-col items-center justify-between'>
      <div className='mx-auto grid w-full max-w-5xl gap-10 sm:gap-14'>
        <section className='mx-auto w-full'>
          <div className='mx-auto max-w-3xl rounded-3xl border border-white/40 bg-white/55 p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)] backdrop-blur sm:p-10'>
            <p className='text-center text-xs font-semibold tracking-[0.35em] text-gray-500 sm:text-sm'>
              EXHIBITION
            </p>
            <h1 className='mt-4 text-center text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl'>
              <span className='text-red-500'>画</span>
              <span className='text-gray-900'>H</span>
              <span className='text-yellow-500'>A</span>
              <span className='text-green-500'>C</span>
              <span className='text-blue-500'>K</span>
              へようこそ
            </h1>
            <p className='mx-auto mt-6 max-w-[52ch] text-center text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg'>
              テーマに沿って描いた作品は、額縁に飾って展示できます。
              <br className='hidden sm:block' />
              あなたのギャラリーを育てよう。
            </p>
          </div>
        </section>

        <section className='mx-auto grid w-full gap-6'>
          <div className='mx-auto flex w-full max-w-3xl items-end justify-between gap-4 px-1'>
            <div>
              <p className='text-xs font-semibold tracking-[0.35em] text-gray-500'>GALLERY</p>
              <h2 className='mt-2 text-2xl font-semibold tracking-tight sm:text-3xl'>
                みんなの作品
              </h2>
            </div>
            <div className='hidden sm:block'>
              <span className='text-sm text-gray-500'>最新の展示</span>
            </div>
          </div>
          <div className='rounded-3xl border border-white/40 bg-white/50 p-4 backdrop-blur sm:p-6'>
            <TopPictures />
          </div>
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

        <section className='mx-auto grid w-full gap-6'>
          <div className='mx-auto w-full max-w-3xl px-1'>
            <p className='text-xs font-semibold tracking-[0.35em] text-gray-500'>ABOUT</p>
            <h2 className='mt-2 text-2xl font-semibold tracking-tight sm:text-3xl'>画HACKの特徴</h2>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <Card className='group relative overflow-hidden border-white/40 bg-white/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl'>
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-900/0 via-zinc-900/0 to-zinc-900/5 opacity-0 transition-opacity group-hover:opacity-100' />
              <Palette className='size-12 text-zinc-900' />
              <h3 className='mt-4 text-lg font-semibold'>テーマで描く</h3>
              <p className='mt-2 text-sm leading-relaxed text-gray-600'>
                テーマに沿って描き、日々のアウトプットを続けよう。
              </p>
            </Card>
            <Card className='group relative overflow-hidden border-white/40 bg-white/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl'>
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-900/0 via-zinc-900/0 to-zinc-900/5 opacity-0 transition-opacity group-hover:opacity-100' />
              <Users className='size-12 text-zinc-900' />
              <h3 className='mt-4 text-lg font-semibold'>みんなと共有</h3>
              <p className='mt-2 text-sm leading-relaxed text-gray-600'>
                作品をシェアして、感想やリアクションでつながろう。
              </p>
            </Card>
            <Card className='group relative overflow-hidden border-white/40 bg-white/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl'>
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-900/0 via-zinc-900/0 to-zinc-900/5 opacity-0 transition-opacity group-hover:opacity-100' />
              <Sparkles className='size-12 text-zinc-900' />
              <h3 className='mt-4 text-lg font-semibold'>飾って楽しむ</h3>
              <p className='mt-2 text-sm leading-relaxed text-gray-600'>
                描いた絵は額縁に入れて展示。ギャラリーを育てよう。
              </p>
            </Card>
          </div>
        </section>
        <section className='mx-auto mt-2 w-full max-w-4xl'>
          <Card className='flex flex-col justify-between border-white/40 bg-white/60 p-5 text-center backdrop-blur sm:flex-row sm:p-8'>
            <Image
              alt='サンプル画像'
              className='size-auto'
              height={240}
              priority
              src='/firstTopIcon.png'
              width={240}
            />
            <div className='mt-6 flex w-full flex-col items-end md:ml-8 md:mt-0 md:w-auto'>
              <div className='flex flex-1 flex-col justify-center'>
                <p className='text-center md:text-left'>
                  あなただけの絵を描いて <br />
                  アプリの中に飾りましょう！
                </p>
              </div>
              <div className='mt-4 flex w-full justify-end'>
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
          </Card>
        </section>
      </div>
      {picture && (
        <QuizModal
          author={picture.user.name}
          frameId={picture.frameId}
          isOpen={isModalOpan}
          onOpenChange={onOpenChange}
          src={picture.imageUrl}
          title={picture.theme?.title}
        />
      )}
    </main>
  )
}

export default Main
