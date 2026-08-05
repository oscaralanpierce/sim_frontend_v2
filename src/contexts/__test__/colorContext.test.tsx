import { describe, test, expect } from 'vitest'
import { render } from '../../support/testUtils'
import { YELLOW, AQUA } from '../../utils/styles/colorSchemes'
import { useColorScheme } from '../../hooks/contexts'
import { ColorProvider } from '../colorContext'

const TestComponent = () => {
  const { schemeColorDarkest } = useColorScheme()

  return <p>{schemeColorDarkest}</p>
}

describe('ColorProvider', () => {
  describe('when a color scheme is indicated', () => {
    it('uses the color scheme provided', () => {
      const wrapper = render(
        <ColorProvider colorScheme={AQUA}>
          <TestComponent />
        </ColorProvider>
      )

      expect(wrapper.getByText(AQUA.schemeColorDarkest)).toBeTruthy()
    })
  })

  describe('when no color scheme is indicated', () => {
    it('uses a default', () => {
      const wrapper = render(
        <ColorProvider>
          <TestComponent />
        </ColorProvider>
      )

      expect(wrapper.getByText(YELLOW.schemeColorDarkest)).toBeTruthy()
    })
  })
})
