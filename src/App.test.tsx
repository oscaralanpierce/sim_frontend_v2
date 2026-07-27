import { describe, test, expect } from 'vitest'
import { act } from '@testing-library/react'
import { render } from './support/testUtils'
import App from './App'

describe('<App />', () => {
  test('App mounts properly', async () => {
    let wrapper
    await act(async () => {
      wrapper = render(<App />)
    })

    expect(wrapper).toBeTruthy()
  })

  test('matches snapshot', async () => {
    let wrapper
    await act(async () => {
      wrapper = render(<App />)
    })

    expect(wrapper).toMatchSnapshot()
  })
})
