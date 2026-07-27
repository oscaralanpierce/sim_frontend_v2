import { describe, test, expect } from 'vitest'
import { BASE_APP_URI, renderWithRouter } from '../../support/testUtils'
import paths from '../../routing/paths'
import NotFoundPage from './notFoundPage'

describe('NotFoundPage', () => {
  test('NotFoundPage displays properly', () => {
    const wrapper = renderWithRouter(<NotFoundPage />)
    expect(wrapper).toBeTruthy()

    const h1 = wrapper.container.querySelector('h1')
    expect(h1?.textContent).toBe('Page Not Found')

    const a = wrapper.container.querySelector('a')
    expect(a?.textContent).toBe('Go Back')
    expect(a?.href).toBe(`${BASE_APP_URI}${paths.home}`)
  })

  test('matches snapshot', () => {
    const wrapper = renderWithRouter(<NotFoundPage />)

    expect(wrapper).toMatchSnapshot()
  })
})