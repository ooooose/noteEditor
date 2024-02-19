'use client'

import { useRouter } from 'next/navigation'
import { CiCirclePlus } from 'react-icons/ci'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Menu = () => {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <CiCirclePlus size={36} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56' side='bottom'>
        <DropdownMenuLabel>画HACK Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push('/timeline')
            }}
          >
            タイムライン
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/themes')}>
            テーマ一覧をみる
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/canvas')}>絵を描く</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/me')}>プロフィール</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
