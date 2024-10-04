import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import SignOut from '@/components/SignOut'
import ConnectSpotify from '@/components/ConnectSpotify'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome, {user.email?.split('@')[0]}!
      </h1>
      <div className="space-y-4">
        <Link 
          href="/profile" 
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300"
        >
          Go to Profile
        </Link>
        <ConnectSpotify />
        <SignOut />
      </div>
    </div>
  )
}