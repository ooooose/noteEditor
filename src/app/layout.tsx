import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/layouts/Header/Header'
import NextAuthProvider from '@/utils/auth/NextAuthProvider'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={notoSansJP.className}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
