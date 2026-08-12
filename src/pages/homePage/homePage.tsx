import { useEffect, useState, type MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGoogleRedirectResult, signInWithGoogle } from '../../firebase'
import { useAuthUser } from '../../hooks/useAuthUser'
import GoogleSignInButton from '../../components/googleSignInButton/googleSignInButton'
import styles from './homePage.module.css'
import paths from '../../routing/paths'

const HomePage = () => {
  const navigate = useNavigate()
  const { user } = useAuthUser()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleSignIn: MouseEventHandler = async () => {
    setIsSigningIn(true)
    try {
      await signInWithGoogle()
    } catch (error: unknown) {
      console.error('Google sign-in failed', error)
      setIsSigningIn(false)
    }
  }

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        await getGoogleRedirectResult()
      } catch (error: unknown) {
        console.error('Google sign-in failed', error)
      }
    }

    void checkRedirectResult()
  }, [])

  useEffect(() => {
    if (user) {
      navigate(paths.dashboard)
    }
  }, [user])

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.header}>Skyrim Inventory Management</h1>
        <div className={styles.login}>
          <GoogleSignInButton onClick={handleSignIn} loading={isSigningIn} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
