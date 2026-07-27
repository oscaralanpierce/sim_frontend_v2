import { type ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { JSDOM } from 'jsdom'
import { render as originalRender } from '@testing-library/react'

export const BASE_APP_URI = 'http://localhost:5173'

const setDom = (url?: string) => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: url || BASE_APP_URI,
  })

  global.window = dom.window as unknown as Window & typeof globalThis
  global.document = dom.window.document
}

/**
 * 
 * Test Renderers
 * 
 */

export const render = (ui: ReactElement, url?: string) => {
  setDom(url)

  return originalRender(ui)
}

export const renderWithRouter = (ui: ReactElement, url?: string) =>
  render(<BrowserRouter>{ui}</BrowserRouter>, url)