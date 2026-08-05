import { describe, test, expect, vi } from 'vitest'
import { render } from '../../support/testUtils'
import LoadingSpinner from './loadingSpinner'

/**
 * Critical behaviour for this component is not testable with Vitest. Whether the
 * loading spinner or the text "Loading..." is visible is dependent on whether the
 * user has set prefers-reduced-motion on their device's OS. If the user prefers
 * reduced motion, the text "Loading..." should be displayed. Otherwise (i.e., in
 * most cases), the text "Loading..." should be hidden (display: none - not in the
 * DOM at all) and the animated spinner should be displayed.
 *
 * We have configured Storybook to enable viewing the different component states.
 * It is recommended to test this component in Storybook whenever it is modified.
 */

describe('LoadingSpinner', () => {
  test('renders the text and spinner', () => {
    const wrapper = render(<LoadingSpinner />)

    expect(wrapper.getByText('Loading...')).toBeTruthy()
    expect(wrapper.getByRole('alert')).toBeTruthy()
  })

  test('matches snapshot', () => {
    // Math.random is used to select the spinner's color randomly.
    // For this test, we need to ensure the same value is always
    // selected to prevent snapshot variations.
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    const wrapper = render(<LoadingSpinner />)

    expect(wrapper).toMatchSnapshot()
  })
})
