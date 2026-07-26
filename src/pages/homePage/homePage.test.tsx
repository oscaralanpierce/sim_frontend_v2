import { describe, test, expect } from 'vitest'
import { render } from '../../support/testUtils'
import HomePage from './homePage'

describe('HomePage', () => {
  describe('when unauthenticated', () => {
    test('displays properly', () => {
      const wrapper = render(<HomePage />)
      expect(wrapper).toBeTruthy()

      const h1 = wrapper.container.querySelector('h1')
      expect(h1?.textContent).toBe('Skyrim Inventory Management')
    })

    test('matches snapshot', () => {
      const wrapper = render(<HomePage />)
      
      expect(wrapper).toMatchSnapshot()
    })
  })
})