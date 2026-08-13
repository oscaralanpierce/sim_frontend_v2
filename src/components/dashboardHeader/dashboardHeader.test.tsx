import { describe, test, expect } from 'vitest'
import { act, fireEvent, waitFor } from '@testing-library/react'
import { type User } from 'firebase/auth'
import { renderWithRouter } from '../../support/testUtils'
import {
  TEST_USER,
  TEST_USER_DISPLAY_NAME,
  TEST_USER_EMAIL,
  TEST_USER_PHOTO_URL,
} from '../../support/data/login'
import { LoginContext } from '../../contexts/loginContext'
import { DashboardProvider } from '../../contexts/dashboardContext'
import paths from '../../routing/paths'
import DashboardHeader from './dashboardHeader'

const render = (user: User | null) =>
  renderWithRouter(
    <LoginContext value={{ user, authLoading: false }}>
      <DashboardProvider>
        <DashboardHeader />
      </DashboardProvider>
    </LoginContext>
  )

/**
 * This component has behavior that cannot be tested here. At mobile and small
 * tablet sizes, the text "Skyrim Inventory Management" is hidden and replaced by
 * a home icon. We should make sure that the home icon is visible, that the text
 * is hidden, and that the icon is the same size as and aligned with the hamburger
 * icon in the UserInfo child component that appears on the right. At larger widths,
 * the icons should be hidden and the user should see the full title and UserInfo
 * fields instead.
 *
 * We also can't test the accordion-type behavior on the header when the pull-tab
 * is clicked or interacted with the keyboard since this is all done in CSS. We
 * will need to ensure that the header is displayed and hidden, that there is a smooth
 * transition with normal device settings, and an instantaneous transition with
 * reduced-motion settings enabled.
 */

describe('DashboardHeader', () => {
  describe('when there is no logged-in user', () => {
    test('displays elements', () => {
      const wrapper = render(null)

      const header = wrapper.getByTestId('pageHeader')
      const showTab = wrapper.getByLabelText('Show Header')
      const textLink = wrapper.getByText('Skyrim Inventory Management')
      const iconLink = wrapper.getByLabelText('Return to Dashboard')
      const userInfo = wrapper.getByLabelText('Toggle Dropdown')

      expect(header.getAttribute('class')).not.toMatch(/visible/i)
      expect(showTab).toBeTruthy()
      expect(textLink).toBeTruthy()
      expect(textLink.getAttribute('href')).toEqual(paths.dashboard)
      expect(iconLink).toBeTruthy()
      expect(iconLink.getAttribute('href')).toEqual(paths.dashboard)
      expect(userInfo).toBeTruthy()
    })

    test('toggles the header when the pull tab is clicked', async () => {
      const wrapper = render(null)

      const pullTab = wrapper.getByLabelText('Show Header')
      const header = wrapper.getByTestId('pageHeader')

      expect(pullTab.getElementsByClassName('fa-chevron-down')).toHaveLength(1)
      expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(0)

      await act(() => fireEvent.click(pullTab))

      await waitFor(() => {
        expect(header.getAttribute('class')).toMatch(/visible/i)
        expect(pullTab.getAttribute('aria-label')).toEqual('Hide Header')
        expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(1)
        expect(pullTab.getElementsByClassName('fa-chevron-down')).toHaveLength(
          0
        )
      })

      await act(() => fireEvent.click(pullTab))

      await waitFor(() => {
        expect(header.getAttribute('class')).not.toMatch(/visible/i)
        expect(pullTab.getAttribute('aria-label')).toEqual('Show Header')
        expect(pullTab.getElementsByClassName('fa-chevron-down')).toBeTruthy()
        expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(0)
      })
    })

    test('toggles the header when the enter key is pressed', async () => {
      const wrapper = render(null)

      const pullTab = wrapper.getByLabelText('Show Header')
      const header = wrapper.getByTestId('pageHeader')

      expect(pullTab.getElementsByClassName('fa-chevron-down')).toHaveLength(1)
      expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(0)

      await act(() => fireEvent.keyDown(pullTab, { key: 'Enter' }))

      await waitFor(() => {
        expect(header.getAttribute('class')).toMatch(/visible/i)
        expect(pullTab.getAttribute('aria-label')).toEqual('Hide Header')
        expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(1)
        expect(pullTab.getElementsByClassName('fa-chevron-down')).toHaveLength(
          0
        )
      })

      await act(() => fireEvent.keyDown(pullTab, { key: 'Enter' }))

      await waitFor(() => {
        expect(header.getAttribute('class')).not.toMatch(/visible/i)
        expect(pullTab.getAttribute('aria-label')).toEqual('Show Header')
        expect(pullTab.getElementsByClassName('fa-chevron-down')).toBeTruthy()
        expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(0)
      })
    })

    test('toggles the header when the space bar is pressed', async () => {
      const wrapper = render(null)

      const pullTab = wrapper.getByLabelText('Show Header')
      const header = wrapper.getByTestId('pageHeader')

      expect(pullTab.getElementsByClassName('fa-chevron-down')).toHaveLength(1)
      expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(0)

      await act(() => fireEvent.keyDown(pullTab, { key: ' ' }))

      await waitFor(() => {
        expect(header.getAttribute('class')).toMatch(/visible/i)
        expect(pullTab.getAttribute('aria-label')).toEqual('Hide Header')
        expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(1)
        expect(pullTab.getElementsByClassName('fa-chevron-down')).toHaveLength(
          0
        )
      })

      await act(() => fireEvent.keyDown(pullTab, { key: ' ' }))

      await waitFor(() => {
        expect(header.getAttribute('class')).not.toMatch(/visible/i)
        expect(pullTab.getAttribute('aria-label')).toEqual('Show Header')
        expect(pullTab.getElementsByClassName('fa-chevron-down')).toBeTruthy()
        expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(0)
      })
    })

    test("doesn't toggle the header if another key is pressed", async () => {
      const wrapper = render(null)

      const pullTab = wrapper.getByLabelText('Show Header')
      const header = wrapper.getByTestId('pageHeader')

      expect(pullTab.getElementsByClassName('fa-chevron-down')).toHaveLength(1)
      expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(0)

      await act(() => fireEvent.keyDown(pullTab, { key: 'F' }))

      await waitFor(() => {
        expect(header.getAttribute('class')).not.toMatch(/visible/i)
        expect(pullTab.getAttribute('aria-label')).toEqual('Show Header')
        expect(pullTab.getElementsByClassName('fa-chevron-down')).toHaveLength(
          1
        )
        expect(pullTab.getElementsByClassName('fa-chevron-up')).toHaveLength(0)
      })
    })

    test('matches snapshot when hidden', () => {
      const wrapper = render(null)

      expect(wrapper).toMatchSnapshot()
    })

    test('matches snapshot when expanded', async () => {
      const wrapper = render(null)

      const pullTab = wrapper.getByLabelText('Show Header')

      await act(() => fireEvent.click(pullTab))

      await waitFor(() => pullTab.getAttribute('aria-label') === 'Hide Header')

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when there is a logged-in user', () => {
    test('displays the user profile info', () => {
      const wrapper = render(TEST_USER)

      const header = wrapper.getByTestId('pageHeader')
      const showTab = wrapper.getByLabelText('Show Header')
      const textLink = wrapper.getByText('Skyrim Inventory Management')
      const iconLink = wrapper.getByLabelText('Return to Dashboard')

      const userName = wrapper.getByText(TEST_USER_DISPLAY_NAME)
      const userEmail = wrapper.getByText(TEST_USER_EMAIL)
      const profileImg = wrapper.getByAltText('User profile image')

      expect(header.getAttribute('class')).not.toMatch(/visible/i)
      expect(showTab).toBeTruthy()
      expect(textLink).toBeTruthy()
      expect(textLink.getAttribute('href')).toEqual(paths.dashboard)
      expect(iconLink).toBeTruthy()
      expect(iconLink.getAttribute('href')).toEqual(paths.dashboard)
      expect(userName).toBeTruthy()
      expect(userEmail).toBeTruthy()
      expect(profileImg.getAttribute('src')).toEqual(TEST_USER_PHOTO_URL)
    })

    test('matches snapshot when hidden', () => {
      const wrapper = render(TEST_USER)

      expect(wrapper).toMatchSnapshot()
    })

    test('matches snapshot when expanded', async () => {
      const wrapper = render(TEST_USER)

      const pullTab = wrapper.getByLabelText('Show Header')

      await act(() => fireEvent.click(pullTab))

      await waitFor(() => pullTab.getAttribute('aria-label') === 'Hide Header')

      expect(wrapper).toMatchSnapshot()
    })
  })
})
