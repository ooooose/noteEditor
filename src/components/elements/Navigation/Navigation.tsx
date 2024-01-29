import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'タイムライン',
    href: '/timeline',
    description: '新たに投稿された絵を閲覧できます。',
  },
  {
    title: 'テーマ一覧',
    href: '/themes',
    description: 'テーマを全て閲覧できます。各テーマのカードを押せば絵を閲覧することもできます。',
  },
  {
    title: '絵を描く',
    href: '/canvas',
    description: '新しく絵を描きましょう。テーマを選択すれば絵を描くことができます！',
  },
  {
    title: 'プロフィール',
    href: '/me',
    description: '自分が書いた絵や、登録情報の更新ができます。',
  },
]

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>メニュー</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[300px] gap-3 p-4 md:grid-cols-1'>
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
