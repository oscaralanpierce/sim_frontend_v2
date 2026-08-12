import { type ReactElement, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useColorScheme } from '../../hooks/contexts'
import { type RelativePath } from '../../types/navigation'
import styles from './navCard.module.css'

interface NavCardProps {
  href: RelativePath
  children: ReactElement | string
}

const NavCard = ({ href, children }: NavCardProps) => {
  const { schemeColorDarkest, hoverColorDark, textColorPrimary } =
    useColorScheme()

  const styleVars = {
    '--background-color': schemeColorDarkest,
    '--hover-color': hoverColorDark,
    '--text-color': textColorPrimary,
  } as CSSProperties

  return (
    <Link className={styles.root} to={href} style={styleVars}>
      {children}
    </Link>
  )
}

export default NavCard
