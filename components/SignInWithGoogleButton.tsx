import React from 'react'
import { Button } from './ui/button'
import { signInWithGoogle } from '@/lib/auth-actions'

export const SignInWithGoogleButton = () => {
  return (
    <Button type="button" variant="outline" className="w-full" onClick={() => signInWithGoogle()}>
        Login with Google
    </Button>
  )
}
