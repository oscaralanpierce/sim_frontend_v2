import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import cards from './testCards'
import NavMosaic from './navMosaic'

type NavMosaicStory = StoryObj<typeof NavMosaic>

const meta: Meta<typeof NavMosaic> = {
  title: 'NavMosaic',
  component: NavMosaic,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta

export const Default: NavMosaicStory = {
  args: {
    cards,
  },
}

const manyCards = [...cards, ...cards]

export const ManyCards: NavMosaicStory = {
  args: {
    cards: manyCards,
  }
}
