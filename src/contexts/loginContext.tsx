import { createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User } from 'firebase/auth'
import { signOutWithGoogle } from '../firebase'
import { useAuthUser } from '../hooks/useAuthUser'
import { type ProviderProps } from '../types/contexts'
import paths from '../routing/paths'

export interface LoginContextType {
  authLoading: boolean
  user?: User | null
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
)

export const LoginProvider = ({ children }: ProviderProps) => {
  const { user, authLoading } = useAuthUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && !authLoading) {
      signOutWithGoogle()
      navigate(paths.home)
    }
  }, [user, authLoading])

  const value = {
    authLoading,
    user,
  }

  return <LoginContext value={value}>{children}</LoginContext>
}
