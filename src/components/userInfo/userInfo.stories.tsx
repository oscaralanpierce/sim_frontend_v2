import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import { TEST_USER } from '../../support/data/login'
import testImg from '../../support/testProfileImg.png'
import UserInfo from './userInfo'

type UserInfoStory = StoryObj<typeof UserInfo>

const meta: Meta<typeof UserInfo> = {
  title: 'UserInfo',
  component: UserInfo,
  decorators: [
    (Story, { parameters }) => (
      <BrowserRouter>
        <LoginContext
          value={{
            user: parameters['user'],
            authLoading: parameters['authLoading'],
          }}
        >
          <div style={{ height: '64px', display: 'flex' }}>
            <Story />
          </div>
        </LoginContext>
      </BrowserRouter>
    ),
  ],
}

export default meta

export const UserProfile: UserInfoStory = {
  parameters: {
    user: { ...TEST_USER, photoURL: testImg },
    authLoading: false,
  },
}

export const UserProfileNoAvatar: UserInfoStory = {
  parameters: {
    user: { ...TEST_USER, photoURL: null },
    authLoading: false,
  },
}

export const NoLoggedInUser: UserInfoStory = {
  parameters: {
    user: null,
    authLoading: true,
  },
}
