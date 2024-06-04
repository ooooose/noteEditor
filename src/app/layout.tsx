import { Inter as FontSans } from 'next/font/google'
import React from 'react'

import './globals.css'
import { PreconnectResources } from '@/components/Seo/PreconnectResources'

import NextAuthProvider from '@/lib/next-auth/NextAuthProvider'
import { cn } from '@/lib/utils'

import type { Metadata } from 'next'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_APP_URL ?? ''),
  title: '画HACK',
  description: 'あなただけの絵を描くアプリ',
  openGraph: {
    title: '画HACK',
    description: 'あなただけの絵を描くアプリ',
  },
  twitter: {
    title: '画HACK',
    description: 'あなただけの絵を描くアプリ',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <PreconnectResources />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
