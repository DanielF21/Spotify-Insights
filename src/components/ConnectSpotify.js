'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Music } from "lucide-react"

export default function ConnectSpotify() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const supabase = createClientComponentClient()

  const handleConnectSpotify = async () => {
    setIsLoading(true)
    setErrorMessage(null)
    const { error: spotifyError } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
            scopes: 'user-read-email user-read-private',
            redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_CALLBACK_URL}`,
      },
    })

    if (spotifyError) {
      // eslint-disable-next-line no-console
      console.error('Error connecting to Spotify:', spotifyError)
      setErrorMessage('Failed to connect to Spotify. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <div>
      <button
        onClick={handleConnectSpotify}
        disabled={isLoading}
        type="button"
        className="w-full bg-[#1DB954] text-white font-bold py-2 px-4 rounded hover:bg-[#1ed760] transition duration-200 flex items-center justify-center"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Connecting...
          </span>
        ) : (
          <span className="flex items-center">
            <Music className="mr-2 h-5 w-5" />
            Connect to Spotify
          </span>
        )}
      </button>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  )
}