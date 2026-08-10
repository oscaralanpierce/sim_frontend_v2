import {
  useState,
  type CSSProperties,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { GLOBAL_CSS_VALUES } from '../../utils/styles/globalCss'
import paths from '../../routing/paths'
import UserInfo from '../userInfo/userInfo'
import styles from './dashboardHeader.module.css'

const DashboardHeader = () => {
  const [headerVisible, setHeaderVisible] = useState(false)

  const {
    titleFontFamily,
    headerBackgroundColor,
    headerTextColor,
    headerTextHoverColor,
  } = GLOBAL_CSS_VALUES

  const styleVars = {
    '--title-font-family': titleFontFamily,
    '--background-color': headerBackgroundColor,
    '--text-color': headerTextColor,
    '--hover-color': headerTextHoverColor,
    '--title-line-height': '1.8rem',
    '--header-font-size': '1.5rem',
  } as CSSProperties

  const toggleHeaderOnClick: MouseEventHandler = (e) => {
    e.preventDefault()
    setHeaderVisible(!headerVisible)
  }

  const toggleHeaderOnKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setHeaderVisible(!headerVisible)
    }
  }

  return (
    <>
      <header className={styles.root} style={styleVars}>
        <nav
          id="pageHeader"
          className={headerVisible ? styles.headerVisible : styles.header}
          data-testid="pageHeader"
          inert={!headerVisible}
        >
          <div className={styles.container}>
            <h1 className={styles.h1}>
              <Link className={styles.headerLink} to={paths.dashboard}>
                Skyrim Inventory Management
              </Link>
              <Link
                className={styles.headerLinkMobile}
                to={paths.dashboard}
                aria-label="Return to Dashboard"
              >
                <FontAwesomeIcon className={styles.house} icon={faHouse} />
              </Link>
            </h1>
            <span className={styles.userInfo}>
              <UserInfo />
            </span>
          </div>
        </nav>
      </header>
      <span
        className={styles.pullTab}
        role="button"
        aria-label={headerVisible ? 'Hide Header' : 'Show Header'}
        tabIndex={0}
        onClick={toggleHeaderOnClick}
        onKeyDown={toggleHeaderOnKeyDown}
        aria-controls="pageHeader"
        aria-expanded={headerVisible}
        style={styleVars}
      >
        <FontAwesomeIcon
          className={styles.chevron}
          icon={headerVisible ? faChevronUp : faChevronDown}
        />
      </span>
    </>
  )
}

export default DashboardHeader
