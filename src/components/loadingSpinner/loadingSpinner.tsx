import { type CSSProperties } from 'react'
import { THEME_COLORS } from '../../utils/styles/colorSchemes'
import { GLOBAL_CSS_VALUES } from '../../utils/styles/globalCss'
import styles from './loadingSpinner.module.css'

const LoadingSpinner = () => {
  const { schemeColorDarkest } =
    THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)]
  const { pageTextColor, bodyFontFamily } = GLOBAL_CSS_VALUES

  const styleVars = {
    '--background-color': schemeColorDarkest,
    '--text-color': pageTextColor,
    '--font-family': bodyFontFamily,
  } as CSSProperties

  return (
    <div className={styles.root} style={styleVars}>
      <p className={styles.text}>Loading...</p>
      <div className={styles.spinner} role="progressbar" aria-label="loading">
        <span className={styles.spinnerComponent} key="first"></span>
        <span className={styles.spinnerComponent} key="second"></span>
        <span className={styles.spinnerComponent} key="third"></span>
        <span className={styles.spinnerComponent} key="fourth"></span>
      </div>
    </div>
  )
}

export default LoadingSpinner
