'use client'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <HamburgerMenuIcon className='size-10' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56' side='bottom'>
        <DropdownMenuLabel>画HACK Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href='/timeline'>
            <DropdownMenuItem>タイムライン</DropdownMenuItem>
          </Link>
          <Link href='/themes'>
            <DropdownMenuItem>テーマ一覧をみる</DropdownMenuItem>
          </Link>
          <Link href='/canvas'>
            <DropdownMenuItem>絵を描く</DropdownMenuItem>
          </Link>
          <Link href='/me'>
            <DropdownMenuItem>プロフィール</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
