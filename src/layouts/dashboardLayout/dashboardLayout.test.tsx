import { describe, test, expect, vi, afterEach } from 'vitest'
import { act, fireEvent } from '@testing-library/react'
import { renderWithRouter } from '../../support/testUtils'
import { TEST_USER, TEST_USER_DISPLAY_NAME } from '../../support/data/login'
import DeFinibus from '../../support/testComponents/deFinibus'
import { LoginContext } from '../../contexts/loginContext'
import { DashboardContext } from '../../contexts/dashboardContext'
import DashboardLayout from './dashboardLayout'

const { setMenuVisible } = vi.hoisted(() => ({
  setMenuVisible: vi.fn(),
}))

const render = (title?: string, menuVisible: boolean = false) =>
  renderWithRouter(
    <LoginContext value={{ user: TEST_USER, authLoading: false }}>
      <DashboardContext
        value={{
          headerVisible: menuVisible, // this value is inert for the purpose of these tests
          setHeaderVisible: vi.fn(),
          menuVisible,
          setMenuVisible,
        }}
      >
        <DashboardLayout title={title}>
          <DeFinibus />
        </DashboardLayout>
      </DashboardContext>
    </LoginContext>
  )

describe('DashboardLayout', () => {
  describe('with a title', () => {
    const title = 'My Dashboard'

    test('displays the header', () => {
      const wrapper = render(title)

      expect(wrapper.getByText('Skyrim Inventory Management')).toBeTruthy()
      expect(wrapper.getByText(TEST_USER_DISPLAY_NAME)).toBeTruthy()
    })

    test('displays the title and content', () => {
      const wrapper = render(title)

      expect(wrapper.getByText(title)).toBeTruthy()
      expect(
        wrapper.getByText('Non eram nescius, Brute,', { exact: false })
      ).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = render(title)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('without a title', () => {
    const title = undefined

    test('displays the header', () => {
      const wrapper = render(title)

      expect(wrapper.getByText('Skyrim Inventory Management')).toBeTruthy()
      expect(wrapper.getByText(TEST_USER_DISPLAY_NAME)).toBeTruthy()
    })

    test('displays the content', () => {
      const wrapper = render(title)

      expect(
        wrapper.getByText('Non eram nescius, Brute,', { exact: false })
      ).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = render(title)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('closing the sign-out menu', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })

    test('closes the menu when the user clicks outside the header', async () => {
      const wrapper = render(undefined, true)

      const content = wrapper.getByText('Non eram nescius, Brute,', {
        exact: false,
      })

      await act(() => fireEvent.click(content))

      expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
    })

    test('closes the menu when the Escape key is pressed', async () => {
      const wrapper = render(undefined, true)

      const content = wrapper.getByText('Non eram nescius, Brute,', {
        exact: false,
      })

      await act(() => fireEvent.keyDown(content, { key: 'Escape' }))

      expect(setMenuVisible).toHaveBeenCalledExactlyOnceWith(false)
    })

    test("doesn't close the menu when another key is pressed", async () => {
      const wrapper = render('Foobar', true)

      const content = wrapper.getByText('Non eram nescius, Brute,', {
        exact: false,
      })

      await act(() => fireEvent.keyDown(content, { key: ' ' }))

      expect(setMenuVisible).not.toHaveBeenCalled()
    })
  })
})
