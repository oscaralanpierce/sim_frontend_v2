import { describe, test, expect, vi } from 'vitest'
import {
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { signInWithGoogle, signOutWithGoogle, auth } from './firebase'

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}))

const mockedSignInWithPopup = vi.mocked(signInWithPopup)
const mockedSignOut = vi.mocked(signOut)

describe('firebase', () => {
  test('signInWithGoogle resolves with the signed-in user', async () => {
    const fakeUser = { displayName: 'Dovahkiin' } as User
    mockedSignInWithPopup.mockResolvedValue({
      user: fakeUser,
    } as UserCredential)

    const user = await signInWithGoogle()

    expect(mockedSignInWithPopup).toHaveBeenCalledOnce()
    expect(user).toBe(fakeUser)
  })

  test('signOutWithGoogle signs the current user out', async () => {
    mockedSignOut.mockResolvedValue()

    await signOutWithGoogle()

    expect(mockedSignOut).toHaveBeenCalledWith(auth)
  })
})
