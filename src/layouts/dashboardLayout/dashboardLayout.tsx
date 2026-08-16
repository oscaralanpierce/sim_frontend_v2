import { type KeyboardEventHandler, type ReactElement } from 'react'
import { useDashboardContext } from '../../hooks/contexts'
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader'
import styles from './dashboardLayout.module.css'

interface DashboardLayoutProps {
  title?: string
  children: ReactElement | string
}

const DashboardLayout = ({ title, children }: DashboardLayoutProps) => {
  const { setMenuVisible } = useDashboardContext()

  const onClick = () => setMenuVisible(false)

  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()

      setMenuVisible(false)
    }
  }

  return (
    <div className={styles.root} onKeyDown={onKeyDown}>
      <DashboardHeader />
      <main className={styles.main} onClick={onClick}>
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
