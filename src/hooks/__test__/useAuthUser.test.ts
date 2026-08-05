import { describe, test, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { useAuthUser } from '../useAuthUser'

vi.mock('../../firebase', () => ({
  auth: { currentUser: null },
}))

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
}))

const mockedOnAuthStateChanged = vi.mocked(onAuthStateChanged)

describe('useAuthUser', () => {
  const unsubscribe = vi.fn()

  beforeEach(() => {
    mockedOnAuthStateChanged.mockReset()
    unsubscribe.mockReset()
    mockedOnAuthStateChanged.mockReturnValue(unsubscribe)
  })

  test('starts in a loading state with no user', () => {
    const { result } = renderHook(() => useAuthUser())

    expect(result.current).toEqual({ user: null, isLoading: true })
  })

  test('reflects the signed-in user once Firebase reports auth state', async () => {
    const fakeUser = { displayName: 'Dovahkiin' } as User

    mockedOnAuthStateChanged.mockImplementation((_auth, callback) => {
      ;(callback as (user: User | null) => void)(fakeUser)
      return unsubscribe
    })

    const { result } = renderHook(() => useAuthUser())

    await waitFor(() => {
      expect(result.current).toEqual({ user: fakeUser, isLoading: false })
    })
  })

  test('reflects a signed-out state once Firebase reports auth state', async () => {
    mockedOnAuthStateChanged.mockImplementation((_auth, callback) => {
      ;(callback as (user: User | null) => void)(null)
      return unsubscribe
    })

    const { result } = renderHook(() => useAuthUser())

    await waitFor(() => {
      expect(result.current).toEqual({ user: null, isLoading: false })
    })
  })

  test('unsubscribes from auth state changes on unmount', () => {
    const { unmount } = renderHook(() => useAuthUser())

    unmount()

    expect(unsubscribe).toHaveBeenCalledOnce()
  })
})
