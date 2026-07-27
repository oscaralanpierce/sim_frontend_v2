import { describe, test, expect } from 'vitest'
import { render } from '../../support/testUtils'
import PageHead from './pageHead'

describe('PageHead', () => {
  test('sets the document lang', () => {
    render(<PageHead title='Test Title' description='A test page' />)

    expect(document.documentElement.lang).toBe('en')
  })

  test('honors a custom lang', () => {
    render(<PageHead title='Test Title' description='A test page' lang='fr' />)

    expect(document.documentElement.lang).toBe('fr')
  })

  test('renders the title and description into <head>', () => {
    render(<PageHead title='Test Title' description='A test page' />)

    expect(document.querySelector('title')?.textContent).toBe('Test Title')
    expect(
      document.querySelector('meta[name="description"]')?.getAttribute('content')
    ).toBe('A test page')
  })
})
