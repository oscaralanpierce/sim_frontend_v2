import { describe, test, expect, vi } from 'vitest'
import {
  getRedirectResult,
  signInWithRedirect,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'
import {
  getGoogleRedirectResult,
  signInWithGoogle,
  signOutWithGoogle,
  auth,
} from './firebase'

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithRedirect: vi.fn(),
  getRedirectResult: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}))

const mockedSignInWithRedirect = vi.mocked(signInWithRedirect)
const mockedGetRedirectResult = vi.mocked(getRedirectResult)
const mockedSignOut = vi.mocked(signOut)

describe('firebase', () => {
  test('signInWithGoogle triggers a redirect to the Google sign-in flow', () => {
    mockedSignInWithRedirect.mockReturnValue(new Promise(() => {}))

    void signInWithGoogle()

    expect(mockedSignInWithRedirect).toHaveBeenCalledOnce()
  })

  test('getGoogleRedirectResult resolves with the signed-in user credential', async () => {
    const fakeUser = { displayName: 'Dovahkiin' } as User
    mockedGetRedirectResult.mockResolvedValue({
      user: fakeUser,
    } as UserCredential)

    const result = await getGoogleRedirectResult()

    expect(mockedGetRedirectResult).toHaveBeenCalledWith(auth)
    expect(result?.user).toBe(fakeUser)
  })

  test('signOutWithGoogle signs the current user out', async () => {
    mockedSignOut.mockResolvedValue()

    await signOutWithGoogle()

    expect(mockedSignOut).toHaveBeenCalledWith(auth)
  })
})
