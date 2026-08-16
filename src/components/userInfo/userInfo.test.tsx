import { describe, test, expect, vi } from 'vitest'
import { act, fireEvent, waitFor } from '@testing-library/react'
import { type User } from 'firebase/auth'
import { renderWithRouter } from '../../support/testUtils'
import { LoginContext } from '../../contexts/loginContext'
import { DashboardContext } from '../../contexts/dashboardContext'
import {
  TEST_USER,
  TEST_USER_DISPLAY_NAME,
  TEST_USER_EMAIL,
  TEST_USER_PHOTO_URL,
} from '../../support/data/login'
import anonymousAvatar from './anonymousAvatar.jpg'
import UserInfo from './userInfo'

const { mockSignOut, setMenuVisible } = vi.hoisted(() => ({
  mockSignOut: vi.fn(),
  setMenuVisible: vi.fn(),
}))

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

const render = (user: User | null, menuVisible: boolean = false) =>
  renderWithRouter(
    <LoginContext value={{ authLoading: false, user }}>
      <DashboardContext
        value={{
          headerVisible: true,
          setHeaderVisible: vi.fn(),
          menuVisible,
          setMenuVisible,
        }}
      >
        <UserInfo />
      </DashboardContext>
    </LoginContext>
  )

describe('UserInfo', () => {
  afterEach(() => vi.resetAllMocks())

  describe('when there is no signed-in user', () => {
    test('displays an anonymous avatar', () => {
      const wrapper = render(null)

      const img = wrapper.getByAltText('Anonymous user avatar')
      expect(img.getAttribute('src')).toEqual(anonymousAvatar)
    })

    test('displays the sign-out menu when clicked', async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      await act(() => fireEvent.click(toggle))

      expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
    })

    test('hides the sign-out menu when clicked', async () => {
      const wrapper = render(null, true)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      await act(() => fireEvent.click(toggle))

      expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
    })

    test('displays the sign-out menu when Enter is pressed', async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')
      expect(menu.getAttribute('class')).not.toMatch(/visible/i)

      await act(() => fireEvent.keyDown(toggle, { key: 'Enter' }))

      expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
    })

    test('displays the sign-out menu when space bar is pressed', async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')
      expect(menu.getAttribute('class')).not.toMatch(/visible/i)

      await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

      expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
    })

    test("doesn't call sign-out function when link is clicked", async () => {
      const wrapper = render(null, true)

      const signOutButton = wrapper.getByLabelText('Sign Out')

      await act(() => fireEvent.click(signOutButton))

      expect(mockSignOut).not.toHaveBeenCalled()
    })

    test("doesn't call sign-out function when Enter is pressed", async () => {
      const wrapper = render(null, true)

      const signOutButton = wrapper.getByLabelText('Sign Out')

      await act(() => fireEvent.keyDown(signOutButton, { key: 'Enter' }))

      expect(mockSignOut).not.toHaveBeenCalled()
    })

    test("doesn't call sign-out function when space bar is pressed", async () => {
      const wrapper = render(null, true)

      const signOutButton = wrapper.getByLabelText('Sign Out')

      await act(() => fireEvent.keyDown(signOutButton, { key: ' ' }))

      expect(mockSignOut).not.toHaveBeenCalled()
    })

    test('matches snapshot with menu hidden', () => {
      const wrapper = render(null)

      expect(wrapper).toMatchSnapshot()
    })

    test('matches snapshot with menu visible', async () => {
      const wrapper = render(null, true)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when there is a signed-in user', () => {
    describe('when the user has a photo URL', () => {
      test('displays the profile data and photo', () => {
        const wrapper = render(TEST_USER)

        expect(wrapper.getByText(TEST_USER_DISPLAY_NAME)).toBeTruthy()
        expect(wrapper.getByText(TEST_USER_EMAIL)).toBeTruthy()

        const img = wrapper.getByAltText('User profile image')

        expect(img.getAttribute('src')).toEqual(TEST_USER_PHOTO_URL)
      })

      test('displays the sign-out menu when clicked', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.click(toggle))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
      })

      test('hides the sign-out menu when clicked', async () => {
        const wrapper = render(TEST_USER, true)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).toMatch(/visible/i)

        await act(() => fireEvent.click(toggle))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
      })

      test('displays the sign-out menu when Enter is pressed', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: 'Enter' }))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
      })

      test('hides the sign-out menu when Enter is pressed', async () => {
        const wrapper = render(TEST_USER, true)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: 'Enter' }))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
      })

      test('displays the sign-out menu when space bar is pressed', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
      })

      test('hides the sign-out menu when space bar is pressed', async () => {
        const wrapper = render(TEST_USER, true)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
      })

      test("doesn't display the sign-out menu when another key is pressed", async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        await act(() => fireEvent.keyDown(toggle, { key: 'Q' }))

        expect(setMenuVisible).not.toHaveBeenCalled()
      })

      test("doesn't hide the sign-out menu when another key is pressed", async () => {
        const wrapper = render(TEST_USER, true)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        await act(() => fireEvent.keyDown(toggle, { key: 'F' }))

        expect(setMenuVisible).not.toHaveBeenCalled()
      })

      test('signs out the user when the link is clicked', async () => {
        const wrapper = render(TEST_USER, true)

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.click(signOutButton))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('signs out the user when Enter is pressed', async () => {
        const wrapper = render(TEST_USER, true)

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: 'Enter' }))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('signs out the user when space bar is pressed', async () => {
        const wrapper = render(TEST_USER, true)

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: ' ' }))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('matches snapshot when menu hidden', () => {
        const wrapper = render(TEST_USER)

        expect(wrapper).toMatchSnapshot()
      })

      test('matches snapshot when menu visible', () => {
        const wrapper = render(TEST_USER, true)

        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when the user has no photo', () => {
      const user = { ...TEST_USER, photoURL: null }

      test('displays profile data and anonymous avatar', () => {
        const wrapper = render(user)

        expect(wrapper.getByText(TEST_USER_DISPLAY_NAME)).toBeTruthy()
        expect(wrapper.getByText(TEST_USER_EMAIL)).toBeTruthy()

        const img = wrapper.getByAltText('Anonymous user avatar')
        expect(img.getAttribute('src')).toEqual(anonymousAvatar)
      })

      test('displays the sign-out menu when clicked', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.click(toggle))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
      })

      test('hides the sign-out menu when clicked', async () => {
        const wrapper = render(user, true)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).toMatch(/visible/i)

        await act(() => fireEvent.click(toggle))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
      })

      test('displays the sign-out menu when Enter is pressed', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: 'Enter' }))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
      })

      test('hides the sign-out menu when Enter is pressed', async () => {
        const wrapper = render(user, true)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: 'Enter' }))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
      })

      test('displays the sign-out menu when space bar is pressed', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(true)
      })

      test('hides the sign-out menu when space bar is pressed', async () => {
        const wrapper = render(user, true)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

        expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
      })

      test("doesn't display the sign-out menu when another key is pressed", async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        await act(() => fireEvent.keyDown(toggle, { key: 'Q' }))

        expect(setMenuVisible).not.toHaveBeenCalled()
      })

      test("doesn't hide the sign-out menu when another key is pressed", async () => {
        const wrapper = render(user, true)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        await act(() => fireEvent.keyDown(toggle, { key: 'Q' }))

        expect(setMenuVisible).not.toHaveBeenCalled()
      })

      test('signs out the user when the link is clicked', async () => {
        const wrapper = render(user, true)

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.click(signOutButton))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('signs out the user when Enter is pressed', async () => {
        const wrapper = render(user, true)

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: 'Enter' }))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('signs out the user when space bar is pressed', async () => {
        const wrapper = render(user, true)

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: ' ' }))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('matches snapshot when menu is hidden', () => {
        const wrapper = render(user)

        expect(wrapper).toMatchSnapshot()
      })

      test('matches snapshot when menu is visible', () => {
        const wrapper = render(user, true)

        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when the user is missing profile information', () => {
      const user = {
        ...TEST_USER,
        displayName: null,
        email: null,
      }

      test('displays default values', () => {
        const wrapper = render(user)

        expect(wrapper.getByText('Anonymous User')).toBeTruthy()
        expect(wrapper.getByText('No Email')).toBeTruthy()
      })

      test('matches snapshot with menu hidden', () => {
        const wrapper = render(user)

        expect(wrapper).toMatchSnapshot()
      })

      test('matches snapshot with menu visible', () => {
        const wrapper = render(user, true)

        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
