'use client'

import { Bell, Camera, Key, Lock, Palette, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Separator } from "@/components/ui/separator"
// import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useProfile } from '../api'

import { DeleteUser } from './DeleteUser'

export default function Settings() {
  const useProfileQuery = useProfile({})
  if (useProfileQuery.isLoading) return <div>Loading...</div>
  return (
    <main className='container py-6'>
      <div className='mx-auto max-w-4xl space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>設定</h1>
            <p className='text-gray-500'>アカウントと設定を管理します</p>
          </div>
        </div>

        <Tabs className='space-y-4' defaultValue='profile'>
          <TabsList>
            <TabsTrigger className='gap-2' value='profile'>
              <User className='size-4' />
              プロフィール
            </TabsTrigger>
            <TabsTrigger className='gap-2' value='account'>
              <Key className='size-4' />
              アカウント
            </TabsTrigger>
            <TabsTrigger className='gap-2' value='notifications'>
              <Bell className='size-4' />
              通知
            </TabsTrigger>
            <TabsTrigger className='gap-2' value='appearance'>
              <Palette className='size-4' />
              外観
            </TabsTrigger>
          </TabsList>

          <TabsContent className='space-y-4' value='profile'>
            <Card>
              <CardHeader>
                <CardTitle>プロフィール</CardTitle>
                <CardDescription>プロフィール情報を管理します</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <Avatar className='size-20'>
                    <AvatarImage src='/placeholder.svg' />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <Button className='gap-2' size='sm' variant='outline'>
                    <Camera className='size-4' />
                    画像を変更
                  </Button>
                </div>
                <div className='grid gap-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>表示名</Label>
                    <Input id='name' placeholder='合瀬雄記' />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='bio'>自己紹介</Label>
                    <Input id='bio' placeholder='あなたについて教えてください' />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>変更を保存</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent className='space-y-4' value='account'>
            <Card className='border-red-200 bg-red-50'>
              <CardHeader>
                <CardTitle className='text-red-600'>危険な操作</CardTitle>
                <CardDescription>一度実行すると取り消すことができません</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='destructive'>アカウントを削除</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>本当にアカウントを削除しますか？</DialogTitle>
                      <DialogDescription>
                        この操作は取り消すことができません。すべてのデータが完全に削除されます。
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DeleteUser userUid={useProfileQuery.data?.uid} />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className='space-y-4' value='notifications'>
            <Card>
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
                <CardDescription>通知の受け取り方を設定します</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between space-x-4'>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Bell className='size-4' />
                      <Label htmlFor='notifications'>プッシュ通知</Label>
                    </div>
                    <p className='text-sm text-gray-500'>
                      新しいいいねやコメントの通知を受け取ります
                    </p>
                  </div>
                  {/* <Switch id="notifications" /> */}
                </div>
                {/* <Separator />
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label htmlFor="emails">メール通知</Label>
                    </div>
                    <p className="text-sm text-gray-500">
                      重要なお知らせをメールで受け取ります
                    </p>
                  </div>
                  <Switch id="emails" />
                </div> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className='space-y-4' value='appearance'>
            <Card>
              <CardHeader>
                <CardTitle>外観設定</CardTitle>
                <CardDescription>アプリの見た目をカスタマイズします</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between space-x-4'>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Lock className='size-4' />
                      <Label htmlFor='private'>ダークモード</Label>
                    </div>
                    <p className='text-sm text-gray-500'>暗めの配色に切り替えます</p>
                  </div>
                  {/* <Switch id="private" /> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
