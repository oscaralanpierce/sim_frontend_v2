import { describe, test, expect, vi } from 'vitest'
import { render } from '../../support/testUtils'
import GoogleSignInButton from './googleSignInButton'

describe('GoogleSignInButton', () => {
  test('calls onClick when clicked', () => {
    const onClick = vi.fn()
    const wrapper = render(<GoogleSignInButton onClick={onClick} />)

    wrapper.container.querySelector('button')?.click()

    expect(onClick).toHaveBeenCalledOnce()
  })

  test('disables the button while loading, preventing clicks', () => {
    const onClick = vi.fn()
    const wrapper = render(<GoogleSignInButton onClick={onClick} loading />)

    wrapper.container.querySelector('button')?.click()

    expect(onClick).not.toHaveBeenCalled()
    expect(wrapper.container.querySelector('button')?.disabled).toBe(true)
  })
})
