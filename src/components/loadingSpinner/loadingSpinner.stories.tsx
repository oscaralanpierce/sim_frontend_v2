import { type Meta, type StoryObj } from '@storybook/react-vite'
import LoadingSpinner from './loadingSpinner'

type LoadingSpinnerStory = StoryObj<typeof LoadingSpinner>

const meta: Meta<typeof LoadingSpinner> = {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
}

export default meta

export const Default: LoadingSpinnerStory = {}

export const ReducedMotion: LoadingSpinnerStory = {
  globals: {
    reducedMotion: 'reduce',
  },
}
