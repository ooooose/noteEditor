import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <div className='cursor-pointer rounded-full border p-3'>
          <PlusIcon className='size-6' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56 p-3' side='bottom'>
        <DropdownMenuLabel>画HACK Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href='/timeline'>
            <DropdownMenuItem className='cursor-pointer p-3'>タイムライン</DropdownMenuItem>
          </Link>
          <Link href='/canvas'>
            <DropdownMenuItem className='cursor-pointer p-3'>絵を描く</DropdownMenuItem>
          </Link>
          <Link href='/me'>
            <DropdownMenuItem className='cursor-pointer p-3'>プロフィール</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
