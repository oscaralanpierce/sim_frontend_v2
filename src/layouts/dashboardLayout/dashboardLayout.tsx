import { type CSSProperties, type ReactElement } from 'react'
import { GLOBAL_CSS_VALUES } from '../../utils/styles/globalCss'
import { LoginProvider } from '../../contexts/loginContext'
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader'
import styles from './dashboardLayout.module.css'

interface DashboardLayoutProps {
  title?: string
  children: ReactElement | string
}

const DashboardLayout = ({ title, children }: DashboardLayoutProps) => {
  const {
    pageBackgroundColor,
    pageBackgroundMinHeight,
    pageBackgroundMinWidth,
    pageTextColor,
    titleFontFamily,
    bodyFontFamily,
  } = GLOBAL_CSS_VALUES

  const styleVars = {
    '--background-color': pageBackgroundColor,
    '--background-height': pageBackgroundMinHeight,
    '--background-width': pageBackgroundMinWidth,
    '--text-color': pageTextColor,
    '--title-font-family': titleFontFamily,
    '--body-font-family': bodyFontFamily,
  } as CSSProperties

  return (
    <div className={styles.root} style={styleVars}>
      <DashboardHeader />
      <main className={styles.main}>
        <section className={styles.content}>
          {title && (
            <>
              <h2 className={styles.title}>{title}</h2>
              <hr className={styles.hr} />
            </>
          )}
          {children}
        </section>
      </main>
    </div>
  )
}
export default DashboardLayout
