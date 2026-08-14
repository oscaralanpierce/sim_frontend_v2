import { type Meta, type StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import { DashboardContext } from '../../contexts/dashboardContext'
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
          <DashboardContext
            value={{
              headerVisible: true,
              setHeaderVisible: () => {},
              menuVisible: parameters['menuVisible'],
              setMenuVisible: () => {},
            }}
          >
            <div style={{ height: '64px', display: 'flex' }}>
              <Story />
            </div>
          </DashboardContext>
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
    menuVisible: false,
  },
}

export const UserProfileLongValues: UserInfoStory = {
  parameters: {
    user: {
      ...TEST_USER,
      photoURL: testImg,
      displayName: 'Theophrastus Bombastus von Hohenheim',
      email: 'theophrastus.bombastus.von.hohenheim@gmail.com',
      menuVisible: false,
    },
  },
}

export const UserProfileNoAvatar: UserInfoStory = {
  parameters: {
    user: { ...TEST_USER, photoURL: null },
    authLoading: false,
    menuVisible: false,
  },
}

export const UserProfileNoData: UserInfoStory = {
  parameters: {
    user: {
      ...TEST_USER,
      photoURL: testImg,
      displayName: null,
      email: null,
    },
    authLoading: false,
    menuVisible: false,
  },
}

export const NoLoggedInUser: UserInfoStory = {
  parameters: {
    user: null,
    authLoading: true,
    menuVisible: false,
  },
}

export const MenuVisible: UserInfoStory = {
  parameters: {
    user: {
      ...TEST_USER,
      photoURL: testImg,
    },
    authLoading: false,
    menuVisible: true,
  },
}
