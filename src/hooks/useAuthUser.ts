import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../firebase'

interface AuthUserState {
  user: User | null
  isLoading: boolean
}

export const useAuthUser = (): AuthUserState => {
  const [state, setState] = useState<AuthUserState>({
    user: auth.currentUser,
    isLoading: true,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ user, isLoading: false })
    })

    return unsubscribe
  }, [])

  return state
}
