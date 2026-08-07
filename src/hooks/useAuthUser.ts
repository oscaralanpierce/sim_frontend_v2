import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../firebase'

interface AuthUserState {
  user: User | null
  authLoading: boolean
}

export const useAuthUser = (): AuthUserState => {
  const [state, setState] = useState<AuthUserState>({
    user: auth.currentUser,
    authLoading: true,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ user, authLoading: false })
    })

    return unsubscribe
  }, [])

  return state
}
