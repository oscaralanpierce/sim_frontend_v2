import { type ReactElement } from 'react'
import { DashboardProvider } from '../../contexts/dashboardContext'
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader'
import styles from './dashboardLayout.module.css'

interface DashboardLayoutProps {
  title?: string
  children: ReactElement | string
}

const DashboardLayout = ({ title, children }: DashboardLayoutProps) => {
  return (
    <DashboardProvider>
      <div className={styles.root}>
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
    </DashboardProvider>
  )
}
export default DashboardLayout
