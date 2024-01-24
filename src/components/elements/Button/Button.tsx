import clsx from 'clsx'
import React, { ReactElement, forwardRef } from 'react'

import { Button as ButtonComponent } from '@/components/ui/button'
import { Spinner } from '../Spinner'

const variants = {
  primary: 'outline',
  inverse: 'bg-white text-blue-600',
  danger: 'bg-red-600 text-white',
}

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
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  isLoading?: boolean
} & IconProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
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
        className={clsx(
          'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
          variants[variant],
          sizes[size],
          className,
        )}
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
