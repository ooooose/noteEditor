import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

import type { NextRequest } from 'next/server'
import type { JWT } from 'next-auth/jwt'

interface NextRequestWithAuth extends NextRequest {
  nextauth: {
    token: JWT | null
    session: object | null
  }
}

export default async function middleware(req: NextRequestWithAuth, ev: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // 認証ミドルウェアの設定
  const authMiddleware = withAuth({
    pages: {
      signIn: '/login',
    },
  })

  // authMiddlewareを呼び出し
  const response = await authMiddleware(req, ev)

  // セッションがあり、ログインページにアクセスした場合ホームページにリダイレクト
  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return response
}

export const config = {
  matcher: ['/timeline', '/me', '/canvas'],
}
