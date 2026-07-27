import { Link } from 'react-router-dom'
import paths from '../../routing/paths'
import styles from './notFoundPage.module.css'

const NotFoundPage = () => (
  <div className={styles.root}>
    <div className={styles.container}>
      <h1 className={styles.header}>Page Not Found</h1>
      <Link className={styles.link} to={paths.home}>
        Go Back
      </Link>
    </div>
  </div>
)

export default NotFoundPage