import { describe, test, expect } from 'vitest'
import { renderWithRouter } from '../../support/testUtils'
import { ColorContext } from '../../contexts/colorContext'
import { RED } from '../../utils/styles/colorSchemes'
import NavCard from './navCard'
import { ReactElement } from 'react';

const render = (ui: ReactElement) => (
  renderWithRouter(<ColorContext value={RED}>{ui}</ColorContext>)
)

describe('NavCard', () => {
  test('displays the link text', () => {
    const linkText = 'Inventory Ledger'
    const href = '/'
    const wrapper = render(<NavCard href={href}>{linkText}</NavCard>)

    const link = wrapper.getByText(linkText)

    expect(link).toBeTruthy()
    expect(link.getAttribute('href')).toEqual(href)
  })

  test('matches snapshot', () => {
    const wrapper = render(<NavCard href="/">Inventory Ledger</NavCard>)

    expect(wrapper).toMatchSnapshot()
  })
})
