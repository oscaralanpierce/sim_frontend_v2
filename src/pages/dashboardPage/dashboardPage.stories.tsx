import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { TEST_USER } from '../../support/data/login'
import { LoginContext } from '../../contexts/loginContext'
import photoURL from '../../support/testProfileImg.png'
import DashboardPage from './dashboardPage'

const user = { ...TEST_USER, photoURL }

type DashboardPageStory = StoryObj<typeof DashboardPage>

const meta: Meta<typeof DashboardPage> = {
  title: 'DashboardPage',
  component: DashboardPage,
  decorators: [
    (Story, { parameters }) => (
      <BrowserRouter>
        <LoginContext
          value={{
            user: parameters['user'],
            authLoading: parameters['authLoading'],
          }}
        >
          <Story />
        </LoginContext>
      </BrowserRouter>
    ),
  ],
}

export default meta

export const Default: DashboardPageStory = {
  parameters: {
    user,
    authLoading: false,
  },
}

export const AuthLoading: DashboardPageStory = {
  parameters: {
    user: null,
    authLoading: true,
  },
}
