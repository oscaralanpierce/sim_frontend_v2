import { describe, test, expect } from 'vitest'
import { renderWithRouter } from '../../support/testUtils'
import { TEST_USER, TEST_USER_DISPLAY_NAME } from '../../support/data/login'
import DeFinibus from '../../support/testComponents/deFinibus'
import { LoginContext } from '../../contexts/loginContext'
import { DashboardProvider } from '../../contexts/dashboardContext'
import DashboardLayout from './dashboardLayout'

const render = (title?: string) =>
  renderWithRouter(
    <LoginContext value={{ user: TEST_USER, authLoading: false }}>
      <DashboardProvider>
        <DashboardLayout title={title}>
            <DeFinibus />
        </DashboardLayout>
      </DashboardProvider>
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
})
