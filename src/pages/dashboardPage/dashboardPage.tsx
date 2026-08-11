import { useLogin } from '../../hooks/contexts'
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner'
import NavMosaic from '../../components/navMosaic/navMosaic'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import navCards from './navCards'
import styles from './dashboardPage.module.css'

const DashboardPage = () => {
  const { authLoading } = useLogin()

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <div className={styles.container}>
          {authLoading ? <LoadingSpinner /> : <NavMosaic cards={navCards} />}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
