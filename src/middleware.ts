import { withAuth } from 'next-auth/middleware'

export default withAuth({
  // リダイレクトページ
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: ['/timeline', '/me', '/canvas', '/themes', '/themes/'],
}
