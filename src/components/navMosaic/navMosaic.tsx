import { type ReactElement } from 'react'
import { type RelativePath } from '../../types/navigation'
import { THEME_COLORS } from '../../utils/styles/colorSchemes'
import { ColorProvider } from '../../contexts/colorContext'
import NavCard from '../navCard/navCard'
import styles from './navMosaic.module.css'

export interface CardAttributes {
  href: RelativePath
  children: string | ReactElement
}

interface NavMosaicProps {
  cards: CardAttributes[]
}

const NavMosaic = ({ cards }: NavMosaicProps) => (
  <div className={styles.root}>
    {cards.map(({ href, children }, index) => (
      <div className={styles.card} key={`card-${index + 1}`}>
        <ColorProvider colorScheme={THEME_COLORS[index % THEME_COLORS.length]}>
          <NavCard href={href}>{children}</NavCard>
        </ColorProvider>
      </div>
    ))}
  </div>
)

export default NavMosaic
