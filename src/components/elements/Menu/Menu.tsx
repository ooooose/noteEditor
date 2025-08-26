'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { Login } from '@/features/auth/components'
import { Logout } from '@/features/auth/components/Logout'

import { Button } from '../Button'

const Menu = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <div className='rounded-full border bg-white p-3 shadow'>
          <PlusIcon className='size-6' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56 p-3' side='bottom'>
        {status === 'authenticated' ? (
          <>
            <DropdownMenuLabel>{session.user.name}さん</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className='cursor-pointer p-3'
                onClick={() => handleNavigation('/timeline')}
              >
                タイムライン
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer p-3'
                onClick={() => handleNavigation('/canvas')}
              >
                絵を描く
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer p-3'
                onClick={() => handleNavigation('/me')}
              >
                プロフィール
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer p-3'
                onClick={() => handleNavigation('/settings')}
              >
                アカウント設定
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem
              className='cursor-pointer p-3 text-red-500'
              onClick={() => setOpenLogoutDialog(true)}
            >
              ログアウト
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuGroup>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className='w-full cursor-pointer rounded-md p-3 text-left transition-colors hover:bg-gray-100'
                  type='button'
                >
                  ログインして始める
                </button>
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
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>

      {/* ログアウト確認ダイアログ */}
      <Dialog onOpenChange={setOpenLogoutDialog} open={openLogoutDialog}>
        <DialogContent className='text-center sm:max-w-[425px]'>
          <DialogHeader>
            <h2 className='text-xl font-bold'>ログアウトしますか？</h2>
          </DialogHeader>
          <DialogDescription>
            <p className='mb-4'>本当にログアウトしますか？</p>
            <div className='mt-4 flex justify-center gap-4'>
              <Button onClick={() => setOpenLogoutDialog(false)} variant='outline'>
                キャンセル
              </Button>
              <Logout />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}

export default Menu
