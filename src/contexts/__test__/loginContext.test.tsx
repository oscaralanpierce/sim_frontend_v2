import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderWithRouter as render } from '../../support/testUtils'
import {
  TEST_USER,
  TEST_USER_DISPLAY_NAME,
  TEST_USER_EMAIL,
  TEST_USER_PHOTO_URL,
  TEST_USER_UID,
} from '../../support/data/login'
import { useLogin } from '../../hooks/contexts'
import paths from '../../routing/paths'
import { LoginProvider } from '../loginContext'

const { mockNavigate, mockSignOut, mockUseAuthUser } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockSignOut: vi.fn(),
  mockUseAuthUser: vi.fn(),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../firebase', async () => {
  const actual = await vi.importActual('../../firebase')
  return {
    ...actual,
    signOutWithGoogle: mockSignOut,
  }
})

vi.mock('../../hooks/useAuthUser', () => ({
  useAuthUser: mockUseAuthUser,
}))

const TestComponent = () => {
  const { user, authLoading } = useLogin()

  return (
    <>
      <p>{`Auth Loading: ${authLoading}`}</p>
      <p>User:</p>
      <ul>
        <li>{`UID: ${user?.uid}`}</li>
        <li>{`Display Name: ${user?.displayName}`}</li>
        <li>{`Email: ${user?.email}`}</li>
        <li>{`Photo URL: ${user?.photoURL}`}</li>
      </ul>
    </>
  )
}

describe('LoginProvider', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('when there is no user and auth is loading', () => {
    beforeEach(() => {
      mockUseAuthUser.mockReturnValue({
        user: null,
        authLoading: true,
      })
    })

    test('it passes the values to its child', () => {
      const wrapper = render(
        <LoginProvider>
          <TestComponent />
        </LoginProvider>
      )

      expect(wrapper.getByText('Auth Loading: true')).toBeTruthy()
      expect(wrapper.getByText('UID: undefined'))
      expect(wrapper.getByText('Display Name: undefined')).toBeTruthy()
      expect(wrapper.getByText('Email: undefined')).toBeTruthy()
      expect(wrapper.getByText('Photo URL: undefined')).toBeTruthy()
    })

    test('does not log the user out', async () => {
      render(
        <LoginProvider>
          <TestComponent />
        </LoginProvider>
      )

      await waitFor(() => {
        expect(mockSignOut).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()
      })
    })
  })

  describe('when there is no user and auth is not loading', () => {
    beforeEach(() => {
      mockUseAuthUser.mockReturnValue({
        user: null,
        authLoading: false,
      })
    })

    test('signs the user out and redirects to the homepage', async () => {
      render(
        <LoginProvider>
          <TestComponent />
        </LoginProvider>
      )

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalledOnce()
        expect(mockNavigate).toHaveBeenCalledExactlyOnceWith(paths.home)
      })
    })
  })

  describe('when there is a user and auth is loading', () => {
    beforeEach(() => {
      mockUseAuthUser.mockReturnValue({
        user: TEST_USER,
        authLoading: true,
      })
    })

    test('passes the values to its child', async () => {
      const wrapper = render(
        <LoginProvider>
          <TestComponent />
        </LoginProvider>
      )

      expect(wrapper.getByText('Auth Loading: true')).toBeTruthy()
      expect(wrapper.getByText(`UID: ${TEST_USER_UID}`)).toBeTruthy()
      expect(
        wrapper.getByText(`Display Name: ${TEST_USER_DISPLAY_NAME}`)
      ).toBeTruthy()
      expect(wrapper.getByText(`Email: ${TEST_USER_EMAIL}`)).toBeTruthy()
      expect(
        wrapper.getByText(`Photo URL: ${TEST_USER_PHOTO_URL}`)
      ).toBeTruthy()

      await waitFor(() => {
        expect(wrapper.queryByText('Auth Loading: false')).toBeFalsy()
      })
    })

    test('does not sign the user out', async () => {
      render(
        <LoginProvider>
          <TestComponent />
        </LoginProvider>
      )

      await waitFor(() => {
        expect(mockSignOut).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()
      })
    })
  })

  describe('when there is a user and auth is not loading', () => {
    beforeEach(() => {
      mockUseAuthUser.mockReturnValue({
        user: TEST_USER,
        authLoading: false,
      })
    })

    test('passes the resolved values to its child', () => {
      const wrapper = render(
        <LoginProvider>
          <TestComponent />
        </LoginProvider>
      )

      expect(wrapper.getByText('Auth Loading: false')).toBeTruthy()
      expect(wrapper.getByText(`UID: ${TEST_USER_UID}`)).toBeTruthy()
      expect(
        wrapper.getByText(`Display Name: ${TEST_USER_DISPLAY_NAME}`)
      ).toBeTruthy()
      expect(wrapper.getByText(`Email: ${TEST_USER_EMAIL}`)).toBeTruthy()
      expect(
        wrapper.getByText(`Photo URL: ${TEST_USER_PHOTO_URL}`)
      ).toBeTruthy()
    })

    test('does not sign the user out', async () => {
      render(
        <LoginProvider>
          <TestComponent />
        </LoginProvider>
      )

      await waitFor(() => {
        expect(mockSignOut).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()
      })
    })
  })
})
