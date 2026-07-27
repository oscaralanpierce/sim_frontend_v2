import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'

// SIM V2's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize auth
export const auth = getAuth(app)

// Initialize Google auth provider
const authProvider = new GoogleAuthProvider()

// Handler function for login button click event
export const signInWithGoogle = async (): Promise<User> => {
  const resp: UserCredential = await signInWithPopup(auth, authProvider)
  return resp.user
}

export const signOutWithGoogle = () => signOut(auth)