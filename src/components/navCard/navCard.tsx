import { type ReactElement, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useColorScheme } from '../../hooks/contexts'
import { GLOBAL_CSS_VALUES } from '../../utils/styles/globalCss'
import { RelativePath } from '../../types/navigation'
import styles from './navCard.module.css'

interface NavCardProps {
  href: RelativePath
  children: ReactElement | string
}

const NavCard = ({ href, children }: NavCardProps) => {
  const { schemeColorDarkest, hoverColorDark, textColorPrimary } =
    useColorScheme()

  const { bodyFontFamily } = GLOBAL_CSS_VALUES

  const styleVars = {
    '--background-color': schemeColorDarkest,
    '--hover-color': hoverColorDark,
    '--text-color': textColorPrimary,
    '--font-family': bodyFontFamily,
  } as CSSProperties

  return (
    <Link className={styles.root} to={href} style={styleVars}>
      {children}
    </Link>
  )
}

export default NavCard
