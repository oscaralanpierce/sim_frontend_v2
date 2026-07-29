import { describe, test, expect, vi, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import { type User } from 'firebase/auth'
import { render } from '../../support/testUtils'
import { useAuthUser } from '../../hooks/useAuthUser'
import { signInWithGoogle } from '../../firebase'
import HomePage from './homePage'

vi.mock('../../hooks/useAuthUser')
vi.mock('../../firebase', () => ({
  signInWithGoogle: vi.fn(),
}))

const mockedUseAuthUser = vi.mocked(useAuthUser)
const mockedSignInWithGoogle = vi.mocked(signInWithGoogle)

describe('HomePage', () => {
  beforeEach(() => {
    mockedUseAuthUser.mockReset()
    mockedSignInWithGoogle.mockReset()
  })

  describe('when unauthenticated', () => {
    beforeEach(() => {
      mockedUseAuthUser.mockReturnValue({ user: null, isLoading: false })
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
      mockedSignInWithGoogle.mockResolvedValue({} as User)
      const wrapper = render(<HomePage />)

      await act(async () => {
        wrapper.container.querySelector('button')?.click()
      })

      expect(mockedSignInWithGoogle).toHaveBeenCalledOnce()
    })

    test('logs an error if signInWithGoogle rejects', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const signInError = new Error('popup closed by user')
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
  })

  describe('when already authenticated', () => {
    test('logs the user’s display name without any interaction', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      mockedUseAuthUser.mockReturnValue({
        user: { displayName: 'Dovahkiin' } as User,
        isLoading: false,
      })

      render(<HomePage />)

      expect(logSpy).toHaveBeenCalledWith('Dovahkiin')
    })

    test('falls back to a generic message when there is no display name', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      mockedUseAuthUser.mockReturnValue({
        user: { displayName: null } as User,
        isLoading: false,
      })

      render(<HomePage />)

      expect(logSpy).toHaveBeenCalledWith('User Logged In')
    })
  })
})
