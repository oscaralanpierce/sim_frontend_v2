import { type KeyboardEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useLogin, useDashboardContext } from '../../hooks/contexts'
import { signOutWithGoogle } from '../../firebase'
import anonymousAvatar from './anonymousAvatar.jpg'
import styles from './userInfo.module.css'

const UserInfo = () => {
  const { menuVisible, setMenuVisible } = useDashboardContext()
  const { user } = useLogin()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const toggleMenuOnKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleMenu()
    }
    if (e.key === 'Escape') setMenuVisible(false)
  }

  return (
    <span className={styles.root}>
      <div>
        <div
          className={styles.button}
          role="button"
          aria-label="Toggle Dropdown"
          aria-controls="userInfoMenu"
          aria-expanded={menuVisible}
          tabIndex={0}
          onClick={toggleMenu}
          onKeyDown={toggleMenuOnKeyDown}
        >
          <FontAwesomeIcon icon={faBars} className={styles.hamburger} />
          {user && (
            <span className={styles.info}>
              <p className={styles.name}>
                {user.displayName || 'Anonymous User'}
              </p>
              <p className={styles.email}>{user.email || 'No Email'}</p>
            </span>
          )}
          <img
            className={styles.avatar}
            src={user?.photoURL || anonymousAvatar}
            alt={
              user?.photoURL ? 'User profile image' : 'Anonymous user avatar'
            }
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <menu
        className={menuVisible ? styles.menuVisible : styles.menu}
        id="userInfoMenu"
        data-testid="userInfoMenu"
        inert={!menuVisible}
      >
        <div
          role="button"
          onClick={() => user !== null && signOutWithGoogle()}
          onKeyDown={(e) => {
            if (user !== null && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              signOutWithGoogle()
            }
            if (e.key === 'Escape') setMenuVisible(false)
          }}
          aria-label="Sign Out"
          tabIndex={menuVisible ? 0 : -1}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className={styles.signOutIcon}
          />
          <p className={styles.signOutText}>Sign Out</p>
        </div>
      </menu>
    </span>
  )
}

export default UserInfo
