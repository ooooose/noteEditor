import { Inter as FontSans } from 'next/font/google'
import React from 'react'

import './globals.css'
import { PreconnectResources } from '@/components/Seo/PreconnectResources'
import MainLayout from '@/components/layouts/Layout/MainLayout'

import NextAuthProvider from '@/lib/next-auth/NextAuthProvider'
import { cn } from '@/lib/utils'

import type { Metadata } from 'next'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: '画HACK',
  description: 'あなただけの絵を描くアプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <PreconnectResources />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextAuthProvider>
          <MainLayout>{children}</MainLayout>
        </NextAuthProvider>
      </body>
    </html>
  )
}
