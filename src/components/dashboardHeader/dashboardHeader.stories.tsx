import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { TEST_USER } from '../../support/data/login'
import { LoginContext } from '../../contexts/loginContext'
import testImage from '../../support/testProfileImg.png'
import DashboardHeader from './dashboardHeader'

type DashboardHeaderStory = StoryObj<typeof DashboardHeader>

const meta: Meta<typeof DashboardHeader> = {
  title: 'DashboardHeader',
  component: DashboardHeader,
  decorators: [
    (Story, { parameters }) => (
      <BrowserRouter>
        <LoginContext
          value={{
            authLoading: parameters['authLoading'],
            user: parameters['user'],
          }}
        >
          <Story />
        </LoginContext>
      </BrowserRouter>
    ),
  ],
}

export default meta

export const AuthLoadingNoUser: DashboardHeaderStory = {
  parameters: {
    authLoading: true,
    user: null,
  },
}

export const AuthLoadingWithUser: DashboardHeaderStory = {
  parameters: {
    authLoading: true,
    user: { ...TEST_USER, photoURL: testImage },
  },
}

export const NotLoadingWithUser: DashboardHeaderStory = {
  parameters: {
    authLoading: false,
    user: { ...TEST_USER, photoURL: testImage },
  },
}

export const WideUserInfoComponent: DashboardHeaderStory = {
  parameters: {
    authLoading: false,
    user: {
      ...TEST_USER,
      photoURL: testImage,
      displayName: 'Theophrastus Bombastus von Hohenheim',
      email: 'theophrastus.bombastus.von.hohenheim@gmail.com',
    },
  },
}

export const ReducedMotion: DashboardHeaderStory = {
  globals: {
    reducedMotion: 'reduce',
  },
  parameters: {
    authLoading: false,
    user: { ...TEST_USER, photoURL: testImage },
  },
}
