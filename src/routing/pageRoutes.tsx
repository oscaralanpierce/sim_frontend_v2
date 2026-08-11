import { type ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { type RelativePath } from '../types/navigation'
import PageHead from '../components/pageHead/pageHead'
import HomePage from '../pages/homePage/homePage'
import DashboardPage from '../pages/dashboardPage/dashboardPage'
import NotFoundPage from '../pages/notFoundPage/notFoundPage'
import paths from './paths'
import { LoginProvider } from '../contexts/loginContext'

const siteTitle = 'Skyrim Inventory Management'

interface BasePage {
  title: string
  description: string
  tsx: ReactElement
}

interface Page extends BasePage {
  pageId: string
  path: RelativePath
}

const notFoundPage: BasePage = {
  title: `${siteTitle} | Page Not Found`,
  description: '404 Not Found',
  tsx: <NotFoundPage />,
}

const pages: Page[] = [
  {
    pageId: 'home',
    title: `${siteTitle} | Home`,
    description: 'Manage inventory and logistics in Skyrim',
    tsx: <HomePage />,
    path: paths.home,
  },
  {
    pageId: 'dashboard',
    title: `${siteTitle} | Main Dashboard`,
    description: 'Navigate your dashboard to manage Skyrim inventory',
    tsx: (
      <LoginProvider>
        <DashboardPage />
      </LoginProvider>
    ),
    path: paths.dashboard,
  },
]

const RouteContent = ({ title, description, tsx }: BasePage) => (
  <>
    <PageHead title={title} description={description} />
    {tsx}
  </>
)

const PageRoutes = () => (
  <Routes>
    <Route
      path="*"
      key="notFound"
      element={<RouteContent {...notFoundPage} />}
    />
    {pages.map(({ pageId, path, title, description, tsx }: Page) => (
      <Route
        key={pageId}
        path={path}
        element={
          <RouteContent title={title} description={description} tsx={tsx} />
        }
      />
    ))}
  </Routes>
)

export default PageRoutes
