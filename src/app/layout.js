import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthProvider from '@/components/AuthProvider'
import '@/styles/globals.css'

export const revalidate = 0

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <main className="w-full max-w-md">
            <h1 className="text-4xl font-bold sm:text-4xl text-white text-center mb-4">
              Spotify Insights
            </h1>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <AuthProvider accessToken={session?.access_token}>
                {children}
              </AuthProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}