import { Work_Sans } from 'next/font/google'
import React from 'react'

import './globals.css'
import { PreconnectResources } from '@/components/Seo/PreconnectResources'

import { baseURL } from '@/lib/constants/env'
import NextAuthProvider from '@/lib/next-auth/next-auth-provider'
import { ReactQueryClientProvider } from '@/lib/react-query/react-query-client-provider'
import { cn } from '@/lib/utils'

import type { Metadata } from 'next'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--work-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseURL ?? ''),
  title: '画HACK',
  description: 'あなただけの絵を描くアプリ',
  openGraph: {
    title: '画HACK',
    description: 'あなただけの絵を描くアプリ',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: '画HACK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '画HACK',
    description: 'あなただけの絵を描くアプリ',
    images: ['/api/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <PreconnectResources />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', workSans.variable)}>
        <NextAuthProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
