import { ReactElement } from 'react'
import { describe, test, expect, vi } from 'vitest'
import { act, fireEvent, waitFor } from '@testing-library/react'
import { type User } from 'firebase/auth'
import { renderWithRouter } from '../../support/testUtils'
import { LoginContext } from '../../contexts/loginContext'
import {
  TEST_USER,
  TEST_USER_DISPLAY_NAME,
  TEST_USER_EMAIL,
  TEST_USER_PHOTO_URL,
} from '../../support/data/login'
import anonymousAvatar from './anonymousAvatar.jpg'
import UserInfo from './userInfo'

const { mockSignOut } = vi.hoisted(() => ({ mockSignOut: vi.fn() }))

vi.mock('../../firebase', () => ({
  signOutWithGoogle: mockSignOut,
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

const render = (user: User | null, ui: ReactElement) =>
  renderWithRouter(
    <LoginContext value={{ authLoading: false, user }}>{ui}</LoginContext>
  )

describe('UserInfo', () => {
  afterEach(() => vi.resetAllMocks())

  describe('when there is no signed-in user', () => {
    test('displays an anonymous avatar', () => {
      const wrapper = render(null, <UserInfo />)

      const img = wrapper.getByAltText('Anonymous user avatar')
      expect(img.getAttribute('src')).toEqual(anonymousAvatar)
    })

    test('matches snapshot', () => {
      const wrapper = render(null, <UserInfo />)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when there is a signed-in user', () => {
    describe('when the user has a photo URL', () => {
      test('displays the profile data and photo', () => {
        const wrapper = render(TEST_USER, <UserInfo />)

        expect(wrapper.getByText(TEST_USER_DISPLAY_NAME)).toBeTruthy()
        expect(wrapper.getByText(TEST_USER_EMAIL)).toBeTruthy()

        const img = wrapper.getByAltText('User profile image')

        expect(img.getAttribute('src')).toEqual(TEST_USER_PHOTO_URL)
      })

      test('displays the sign out menu when clicked', async () => {
        const wrapper = render(TEST_USER, <UserInfo />)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.click(toggle))

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })
      })

      test('signs out the user when the link is clicked', async () => {
        const wrapper = render(TEST_USER, <UserInfo />)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.click(signOutButton))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('matches snapshot', () => {
        const wrapper = render(TEST_USER, <UserInfo />)

        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when the user has no photo', () => {
      const user = { ...TEST_USER, photoURL: null }

      test('displays profile data and anonymous avatar', () => {
        const wrapper = render(user, <UserInfo />)

        expect(wrapper.getByText(TEST_USER_DISPLAY_NAME)).toBeTruthy()
        expect(wrapper.getByText(TEST_USER_EMAIL)).toBeTruthy()

        const img = wrapper.getByAltText('Anonymous user avatar')
        expect(img.getAttribute('src')).toEqual(anonymousAvatar)
      })

      test('displays the sign out menu when clicked', async () => {
        const wrapper = render(user, <UserInfo />)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.click(toggle))

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })
      })

      test('signs out the user when the link is clicked', async () => {
        const wrapper = render(user, <UserInfo />)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.click(signOutButton))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('matches snapshot', () => {
        const wrapper = render(user, <UserInfo />)

        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
