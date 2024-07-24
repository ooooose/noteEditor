'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }
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
          <DropdownMenuItem className='cursor-pointer p-3' onClick={() => handleNavigation('/me')}>
            プロフィール
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
