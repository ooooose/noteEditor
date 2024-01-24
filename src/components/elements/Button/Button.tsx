import clsx from 'clsx'
import React, { ReactElement, forwardRef } from 'react'

import { Button as ButtonComponent } from '@/components/ui/button'
import { Spinner } from '../Spinner'

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
}

type IconProps =
  | { startIcon: ReactElement; endIcon?: never }
  | { endIcon: ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'outline'
    | 'default'
    | 'destructive'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
  size?: keyof typeof sizes
  isLoading?: boolean
} & IconProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'default',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonComponent
        ref={ref}
        type={type}
        variant={variant}
        className={clsx(sizes[size], className)}
        {...props}
      >
        {isLoading && <Spinner size='sm' className='text-current' />}
        {!isLoading && startIcon}
        <span className='mx-2'>{props.children}</span> {!isLoading && endIcon}
      </ButtonComponent>
    )
  },
)

Button.displayName = 'Button'
