import { describe, test, expect } from 'vitest'
import { renderWithRouter as render } from '../../support/testUtils'
import cards from './testCards'
import NavMosaic from './navMosaic'

describe('NavMosaic', () => {
  test('renders all the cards', () => {
    const wrapper = render(<NavMosaic cards={cards} />)

    for (let i = 1; i <= cards.length; i++) {
      const card = wrapper.getByText(`Link ${i}`)
      expect(card).toBeTruthy()
      expect(card.getAttribute('href')).toEqual(`/href${i}`)
    }
  })

  test('matches snapshot', () => {
    const wrapper = render(<NavMosaic cards={cards} />)

    expect(wrapper).toMatchSnapshot()
  })
})
