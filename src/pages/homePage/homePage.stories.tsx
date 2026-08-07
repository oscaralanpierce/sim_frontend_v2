import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './homePage'

type HomePageStory = StoryObj<typeof HomePage>

const meta: Meta<typeof HomePage> = {
  title: 'HomePage',
  component: HomePage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta

export const Default: HomePageStory = {}
