import { describe, test, expect, vi, beforeEach } from 'vitest'
import { act, waitFor } from '@testing-library/react'
import { type User } from 'firebase/auth'
import { renderWithRouter as render } from '../../support/testUtils'
import { useAuthUser } from '../../hooks/useAuthUser'
import { getGoogleRedirectResult, signInWithGoogle } from '../../firebase'
import HomePage from './homePage'
import paths from '../../routing/paths'

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}))

vi.mock('../../hooks/useAuthUser')
vi.mock('../../firebase', () => ({
  signInWithGoogle: vi.fn(),
  getGoogleRedirectResult: vi.fn(),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockedUseAuthUser = vi.mocked(useAuthUser)
const mockedSignInWithGoogle = vi.mocked(signInWithGoogle)
const mockedGetGoogleRedirectResult = vi.mocked(getGoogleRedirectResult)

describe('HomePage', () => {
  beforeEach(() => {
    mockedUseAuthUser.mockReset()
    mockedSignInWithGoogle.mockReset()
    mockedGetGoogleRedirectResult.mockReset()
    mockedGetGoogleRedirectResult.mockResolvedValue(null)
  })

  describe('when unauthenticated', () => {
    beforeEach(() => {
      mockedUseAuthUser.mockReturnValue({ user: null, authLoading: false })
    })

    test('displays properly', () => {
      const wrapper = render(<HomePage />)
      expect(wrapper).toBeTruthy()

      const h1 = wrapper.container.querySelector('h1')
      expect(h1?.textContent).toBe('Skyrim Inventory Management')
    })

    test('matches snapshot', () => {
      const wrapper = render(<HomePage />)

      expect(wrapper).toMatchSnapshot()
    })

    test('does not log anything', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      render(<HomePage />)

      expect(logSpy).not.toHaveBeenCalled()
    })

    test('calls signInWithGoogle when the button is clicked', async () => {
      mockedSignInWithGoogle.mockResolvedValue()
      const wrapper = render(<HomePage />)

      await act(async () => {
        wrapper.container.querySelector('button')?.click()
      })

      expect(mockedSignInWithGoogle).toHaveBeenCalledOnce()
    })

    test('logs an error if signInWithGoogle rejects', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const signInError = new Error('redirect failed')
      mockedSignInWithGoogle.mockRejectedValue(signInError)
      const wrapper = render(<HomePage />)

      await act(async () => {
        wrapper.container.querySelector('button')?.click()
      })

      expect(errorSpy).toHaveBeenCalledWith(
        'Google sign-in failed',
        signInError
      )
    })

    test('logs an error if getGoogleRedirectResult rejects', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const redirectError = new Error(
        'account-exists-with-different-credential'
      )
      mockedGetGoogleRedirectResult.mockRejectedValue(redirectError)

      render(<HomePage />)

      await waitFor(() => {
        expect(errorSpy).toHaveBeenCalledWith(
          'Google sign-in failed',
          redirectError
        )
      })
    })
  })

  describe('when already authenticated', () => {
    test('navigates to the dashboard', async () => {
      mockedUseAuthUser.mockReturnValue({
        user: { displayName: 'Dovahkiin' } as User,
        authLoading: false,
      })

      render(<HomePage />)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledExactlyOnceWith(paths.dashboard)
      })
    })
  })
})
