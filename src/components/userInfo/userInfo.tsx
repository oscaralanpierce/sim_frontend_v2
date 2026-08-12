import { useState, type KeyboardEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useLogin } from '../../hooks/contexts'
import { signOutWithGoogle } from '../../firebase'
import anonymousAvatar from './anonymousAvatar.jpg'
import styles from './userInfo.module.css'

const UserInfo = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const { user } = useLogin()

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const toggleDropdownOnKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDropdown()
    }
    if (e.key === 'Escape') setDropdownVisible(false)
  }

  return (
    <span className={styles.root}>
      <div>
        <div
          className={styles.button}
          role="button"
          aria-label="Toggle Dropdown"
          aria-controls="userInfoMenu"
          aria-expanded={dropdownVisible}
          tabIndex={0}
          onClick={toggleDropdown}
          onKeyDown={toggleDropdownOnKeyDown}
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
        className={dropdownVisible ? styles.dropdownVisible : styles.dropdown}
        id="userInfoMenu"
        data-testid="userInfoMenu"
      >
        <div
          role="button"
          onClick={() => user !== null && signOutWithGoogle()}
          onKeyDown={(e) => {
            if (user !== null && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              signOutWithGoogle()
            }
            if (e.key === 'Escape') setDropdownVisible(false)
          }}
          aria-label="Sign Out"
          tabIndex={dropdownVisible ? 0 : -1}
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
