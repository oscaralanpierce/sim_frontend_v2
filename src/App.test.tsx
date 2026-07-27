import { describe, test, expect } from 'vitest'
import { render } from './support/testUtils'
import App from './App'

describe('<App />', () => {
  test('App mounts properly', () => {
    const wrapper = render(<App />)
    expect(wrapper).toBeTruthy()
  })

  test('matches snapshot', () => {
    const wrapper = render(<App />)

    expect(wrapper).toMatchSnapshot()
  })
})
