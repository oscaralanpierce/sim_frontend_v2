import { describe, test, expect, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import { type User } from 'firebase/auth'
import { LoginContext, LoginProvider } from '../../contexts/loginContext'
import { renderWithRouter } from '../../support/testUtils'
import {
  TEST_USER,
  TEST_USER_DISPLAY_NAME,
  TEST_USER_EMAIL,
  TEST_USER_PHOTO_URL,
} from '../../support/data/login'
import paths from '../../routing/paths'
import anonymousAvatar from '../../components/userInfo/anonymousAvatar.jpg'
import navCards from './navCards'
import DashboardPage from './dashboardPage'

const { mockNavigate, mockUseAuthUser } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockUseAuthUser: vi.fn(),
}))

const render = (user: User | null, authLoading: boolean) =>
  renderWithRouter(
    <LoginContext value={{ user, authLoading }}>
      <DashboardPage />
    </LoginContext>
  )

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('when auth is loading', () => {
    const user = null
    const authLoading = true

    test('renders the loading spinner and anonymous avatar', () => {
      const wrapper = render(user, authLoading)

      expect(wrapper.getByText('Skyrim Inventory Management')).toBeTruthy()
      expect(wrapper.getByText('Loading...')).toBeTruthy()

      const image = wrapper.getByAltText('Anonymous user avatar')
      expect(image).toBeTruthy()
      expect(image.getAttribute('src')).toEqual(anonymousAvatar)
    })

    test('matches snapshot', () => {
      const wrapper = render(user, authLoading)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when there is a logged-in user', () => {
    const user = TEST_USER
    const authLoading = false

    test('renders the user info and nav links', () => {
      const wrapper = render(user, authLoading)

      expect(wrapper.getByText('Skyrim Inventory Management')).toBeTruthy()
      expect(wrapper.queryByText('Loading...')).toBeFalsy()

      const image = wrapper.getByAltText('User profile image')
      expect(image).toBeTruthy()
      expect(image.getAttribute('src')).toEqual(TEST_USER_PHOTO_URL)

      expect(wrapper.getByText(TEST_USER_DISPLAY_NAME)).toBeTruthy()
      expect(wrapper.getByText(TEST_USER_EMAIL)).toBeTruthy()

      navCards.forEach((link) => {
        const card = wrapper.getByText(link.children as string)

        expect(card).toBeTruthy()
        expect(card.getAttribute('href')).toEqual(link.href)
      })
    })

    test('matches snapshot', () => {
      const wrapper = render(user, authLoading)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when there is no logged-in user', () => {
    beforeEach(() => {
      mockUseAuthUser.mockImplementation(() => {
        return {
          user: null,
          authLoading: false,
        }
      })

      vi.mock('../../hooks/useAuthUser', () => {
        return {
          useAuthUser: mockUseAuthUser,
        }
      })

      vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom')
        return {
          ...actual,
          useNavigate: () => mockNavigate,
        }
      })
    })

    test('navigates to the homepage without rendering links', async () => {
      const wrapper = renderWithRouter(
        <LoginProvider>
          <DashboardPage />
        </LoginProvider>
      )

      navCards.forEach(async ({ children }) => {
        await waitFor(() =>
          expect(wrapper.queryByText(children as string)).toBeFalsy()
        )
      })

      await waitFor(() =>
        expect(mockNavigate).toHaveBeenCalledExactlyOnceWith(paths.home)
      )
    })
  })
})
