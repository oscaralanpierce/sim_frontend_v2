import { describe, test, expect } from 'vitest'
import { act, fireEvent, waitFor } from '@testing-library/react'
import { render } from '../../support/testUtils'
import { useDashboardContext } from '../../hooks/contexts'
import { DashboardProvider } from '../dashboardContext'
import Test from 'node:test';

const TestComponent = () => {
  const { menuVisible, setMenuVisible, headerVisible, setHeaderVisible } =
    useDashboardContext()

  const toggleMenu = () => setMenuVisible(!menuVisible)
  const toggleHeader = () => setHeaderVisible(!headerVisible)

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault()
          toggleHeader()
        }}
      >
        Toggle Header
      </button>
      <p>{`Header Visible: ${headerVisible}`}</p>

      <button
        onClick={(e) => {
          e.preventDefault()
          toggleMenu()
        }}
      >
        Toggle Menu
      </button>
      <p>{`Menu Visible: ${menuVisible}`}</p>
    </div>
  )
}

describe('DashboardProvider', () => {
  describe('header state and controls', () => {
    test('header starts out hidden', () => {
      const wrapper = render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      )

      expect(wrapper.getByText('Header Visible: false')).toBeTruthy()
    })

    test('shows and hides header when header state is set', async () => {
      const wrapper = render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      )

      expect(wrapper.getByText('Header Visible: false')).toBeTruthy()

      const button = wrapper.getByText('Toggle Header')

      await act(() => fireEvent.click(button))

      await waitFor(() => {
        expect(wrapper.getByText('Header Visible: true')).toBeTruthy()
      })

      await act(() => fireEvent.click(button))

      await waitFor(() => {
        expect(wrapper.getByText('Header Visible: false')).toBeTruthy()
      })
    })
  })

  describe('menu state and controls', () => {
    test('menu starts out hidden', () => {
      const wrapper = render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      )

      expect(wrapper.getByText('Menu Visible: false')).toBeTruthy()
    })

    test('shows and hides menu when menu state is set', async () => {
      const wrapper = render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      )

      const headerButton = wrapper.getByText('Toggle Header')
      const menuButton = wrapper.getByText('Toggle Menu')

      // Header has to be displayed before menu can be
      await act(() => fireEvent.click(headerButton))
      await act(() => fireEvent.click(menuButton))

      await waitFor(() => {
        expect(wrapper.getByText('Header Visible: true')).toBeTruthy()
        expect(wrapper.getByText('Menu Visible: true')).toBeTruthy()
      })

      await act(() => fireEvent.click(menuButton))

      await waitFor(() => {
        expect(wrapper.getByText('Header Visible: true')).toBeTruthy()
        expect(wrapper.getByText('Menu Visible: false')).toBeTruthy()
      })
    })
  })

  describe('combined header and menu behavior', () => {
    test("won't set the menu to visible if the header is not", async () => {
      const wrapper = render(
        <DashboardProvider>
          <TestComponent />
        </DashboardProvider>
      )

      expect(wrapper.getByText('Header Visible: false')).toBeTruthy()
      expect(wrapper.getByText('Menu Visible: false')).toBeTruthy()

      const button = wrapper.getByText('Toggle Menu')

      await act(() => fireEvent.click(button))

      await waitFor(() => {
        expect(wrapper.getByText('Header Visible: false')).toBeTruthy()
        expect(wrapper.getByText('Menu Visible: false')).toBeTruthy()
      })
    })
  })
})
