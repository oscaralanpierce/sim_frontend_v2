import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { TEST_USER } from '../../support/data/login'
import profileImage from '../../support/testProfileImg.png'
import DeFinibus from '../../support/testComponents/deFinibus'
import { LoginContext } from '../../contexts/loginContext'
import DashboardLayout from './dashboardLayout'

const user = { ...TEST_USER, photoURL: profileImage }

type DashboardLayoutStory = StoryObj<typeof DashboardLayout>

const meta: Meta<typeof DashboardLayout> = {
  title: 'DashboardLayout',
  component: DashboardLayout,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <LoginContext value={{ user, authLoading: false }}>
          <Story />
        </LoginContext>
      </BrowserRouter>
    ),
  ],
}

export default meta

export const WithTitle: DashboardLayoutStory = {
  args: {
    title: 'My Dashboard',
    children: <DeFinibus />,
  },
}

export const WithoutTitle: DashboardLayoutStory = {
  args: {
    children: <DeFinibus />,
  },
}

export const WithTitleLongContent: DashboardLayoutStory = {
  args: {
    title: 'My Dashboard',
    children: <DeFinibus extraLong />,
  },
}

export const WithoutTitleLongContent: DashboardLayoutStory = {
  args: {
    children: <DeFinibus extraLong />,
  },
}
