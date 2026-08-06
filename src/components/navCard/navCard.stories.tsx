import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { ColorContext } from '../../contexts/colorContext'
import { GREEN } from '../../utils/styles/colorSchemes'
import NavCard from './navCard'

type NavCardStory = StoryObj<typeof NavCard>

const meta: Meta<typeof NavCard> = {
  title: 'NavCard',
  component: NavCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ColorContext value={GREEN}>
          <Story />
        </ColorContext>
      </BrowserRouter>
    ),
  ],
}

export default meta

export const Default: NavCardStory = {
  args: {
    href: '#',
    children: 'Inventory Ledger',
  },
}

export const LongString: NavCardStory = {
  args: {
    href: '#',
    children: 'Neque porro quisquam est quis dolorem ipsum quia dolor sit amet',
  },
}
