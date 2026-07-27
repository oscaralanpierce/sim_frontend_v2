import { useEffect, useState, type MouseEventHandler } from 'react'
import GoogleSignInButton from '../../components/googleSignInButton/googleSignInButton'
import useAuthUser from '../../hooks/useAuthUser'
import { signInWithGoogle } from '../../firebase'
import styles from './homePage.module.css'

const HomePage = () => {
  const { user } = useAuthUser()
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    if (user) {
      console.log(user.displayName || 'User Logged In')
    }
  }, [user])

  const handleSignIn: MouseEventHandler = () => {
    setIsSigningIn(true)
    signInWithGoogle()
      .catch((error: unknown) => {
        console.error('Google sign-in failed', error)
      })
      .finally(() => setIsSigningIn(false))
  }

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