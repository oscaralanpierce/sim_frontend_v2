import { type Meta, type StoryObj } from '@storybook/react-vite'
import HomePage from './homePage'

type HomePageStory = StoryObj<typeof HomePage>

const meta: Meta<typeof HomePage> = {
  title: 'HomePage',
  component: HomePage,
}

export default meta

export const Default: HomePageStory = {}
