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

const render = (user: User | null) =>
  renderWithRouter(
    <LoginContext value={{ authLoading: false, user }}>
      <UserInfo />
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

      const menu = wrapper.getByTestId('userInfoMenu')
      expect(menu.getAttribute('class')).not.toMatch(/visible/i)

      await act(() => fireEvent.click(toggle))

      await waitFor(() => {
        expect(menu.getAttribute('class')).toMatch(/visible/i)
      })
    })

    test('displays the sign-out menu when Enter is pressed', async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')
      expect(menu.getAttribute('class')).not.toMatch(/visible/i)

      await act(() => fireEvent.keyDown(toggle, { key: 'Enter' }))

      await waitFor(() => {
        expect(menu.getAttribute('class')).toMatch(/visible/i)
      })
    })

    test('displays the sign-out menu when space bar is pressed', async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')
      expect(menu.getAttribute('class')).not.toMatch(/visible/i)

      await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

      await waitFor(() => {
        expect(menu.getAttribute('class')).toMatch(/visible/i)
      })
    })

    test('hides the sign-out menu when Escape is pressed with control in focus', async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')
      expect(menu.getAttribute('class')).not.toMatch(/visible/i)

      await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

      await waitFor(() => {
        expect(menu.getAttribute('class')).toMatch(/visible/i)
      })

      await act(() => fireEvent.keyDown(toggle, { key: 'Escape' }))

      await waitFor(() => {
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)
      })
    })

    test("doesn't call sign-out function when link is clicked", async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')

      await act(() => fireEvent.click(toggle))
      await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

      const signOutButton = wrapper.getByLabelText('Sign Out')

      await act(() => fireEvent.click(signOutButton))

      expect(mockSignOut).not.toHaveBeenCalled()
    })

    test("doesn't call sign-out function when Enter is pressed", async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')

      await act(() => fireEvent.click(toggle))
      await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

      const signOutButton = wrapper.getByLabelText('Sign Out')

      await act(() => fireEvent.keyDown(signOutButton, { key: 'Enter' }))

      expect(mockSignOut).not.toHaveBeenCalled()
    })

    test("doesn't call sign-out function when space bar is pressed", async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')

      await act(() => fireEvent.click(toggle))
      await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

      const signOutButton = wrapper.getByLabelText('Sign Out')

      await act(() => fireEvent.keyDown(signOutButton, { key: ' ' }))

      expect(mockSignOut).not.toHaveBeenCalled()
    })

    test('hides the menu when Escape pressed with menu in focus', async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      const menu = wrapper.getByTestId('userInfoMenu')

      await act(() => fireEvent.click(toggle))
      await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

      const signOutButton = wrapper.getByLabelText('Sign Out')

      await act(() => fireEvent.keyDown(signOutButton, { key: 'Escape' }))

      expect(mockSignOut).not.toHaveBeenCalled()

      await waitFor(() =>
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)
      )
    })

    test('matches snapshot with menu hidden', () => {
      const wrapper = render(null)

      expect(wrapper).toMatchSnapshot()
    })

    test('matches snapshot with menu visible', async () => {
      const wrapper = render(null)

      const toggle = wrapper.getByLabelText('Toggle Dropdown')

      await act(() => fireEvent.click(toggle))

      await waitFor(() =>
        wrapper
          .getByTestId('userInfoMenu')
          .getAttribute('class')
          ?.match(/visible/i)
      )

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

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })
      })

      test('displays the sign-out menu when Enter is pressed', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: 'Enter' }))

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })
      })

      test('displays the sign-out menu when space bar is pressed', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })
      })

      test('hides the sign-out menu when Escape is pressed with control in focus', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })

        await act(() => fireEvent.keyDown(toggle, { key: 'Escape' }))

        await waitFor(() => {
          expect(menu.getAttribute('class')).not.toMatch(/visible/i)
        })
      })

      test("doesn't display or hide the sign-out menu when another key is pressed", async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')
        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.keyDown(toggle, { key: 'Q' }))

        await waitFor(() =>
          expect(menu.getAttribute('class')).not.toMatch(/visible/i)
        )

        await act(() => fireEvent.click(toggle))

        await waitFor(() => menu.getAttribute('class')?.match(/visible/i))

        await act(() => fireEvent.keyDown(toggle, { key: 'M' }))

        await waitFor(() =>
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        )
      })

      test('signs out the user when the link is clicked', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.click(signOutButton))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('signs out the user when Enter is pressed', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: 'Enter' }))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('signs out the user when space bar is pressed', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: ' ' }))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('hides the menu when Escape pressed with menu in focus', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: 'Escape' }))

        expect(mockSignOut).not.toHaveBeenCalled()

        await waitFor(() =>
          expect(menu.getAttribute('class')).not.toMatch(/visible/i)
        )
      })

      test('matches snapshot when menu hidden', () => {
        const wrapper = render(TEST_USER)

        expect(wrapper).toMatchSnapshot()
      })

      test('matches snapshot when menu visible', async () => {
        const wrapper = render(TEST_USER)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        await act(() => fireEvent.click(toggle))

        await waitFor(() =>
          wrapper
            .getByTestId('userInfoMenu')
            .getAttribute('class')
            ?.match(/visible/i)
        )

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

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })
      })

      test('displays the sign-out menu when Enter is pressed', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: 'Enter' }))

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })
      })

      test('displays the sign-out menu when space bar is pressed', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })
      })

      test("doesn't display or hide the sign-out menu when another key is pressed", async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')
        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.keyDown(toggle, { key: 'Q' }))

        await waitFor(() =>
          expect(menu.getAttribute('class')).not.toMatch(/visible/i)
        )

        await act(() => fireEvent.click(toggle))

        await waitFor(() => menu.getAttribute('class')?.match(/visible/i))

        await act(() => fireEvent.keyDown(toggle, { key: 'M' }))

        await waitFor(() =>
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        )
      })

      test('hides the sign-out menu when Escape is pressed with control in focus', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')
        expect(menu.getAttribute('class')).not.toMatch(/visible/i)

        await act(() => fireEvent.keyDown(toggle, { key: ' ' }))

        await waitFor(() => {
          expect(menu.getAttribute('class')).toMatch(/visible/i)
        })

        await act(() => fireEvent.keyDown(toggle, { key: 'Escape' }))

        await waitFor(() => {
          expect(menu.getAttribute('class')).not.toMatch(/visible/i)
        })
      })

      test('signs out the user when the link is clicked', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.click(signOutButton))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('signs out the user when Enter is pressed', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: 'Enter' }))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('signs out the user when space bar is pressed', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: ' ' }))

        expect(mockSignOut).toHaveBeenCalledOnce()
      })

      test('hides the menu when Escape pressed with menu in focus', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        const menu = wrapper.getByTestId('userInfoMenu')

        await act(() => fireEvent.click(toggle))
        await waitFor(() => menu?.getAttribute('class')?.match(/visible/i))

        const signOutButton = wrapper.getByLabelText('Sign Out')

        await act(() => fireEvent.keyDown(signOutButton, { key: 'Escape' }))

        expect(mockSignOut).not.toHaveBeenCalled()

        await waitFor(() =>
          expect(menu.getAttribute('class')).not.toMatch(/visible/i)
        )
      })

      test('matches snapshot when menu is hidden', () => {
        const wrapper = render(user)

        expect(wrapper).toMatchSnapshot()
      })

      test('matches snapshot when menu is visible', async () => {
        const wrapper = render(user)

        const toggle = wrapper.getByLabelText('Toggle Dropdown')

        await act(() => fireEvent.click(toggle))

        await waitFor(() =>
          wrapper
            .getByTestId('userInfoMenu')
            .getAttribute('class')
            ?.match(/visible/i)
        )

        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
