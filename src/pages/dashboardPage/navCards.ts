import { THEME_COLORS } from '../../utils/styles/colorSchemes'
import { type CardAttributes } from '../../components/navMosaic/navMosaic'

export default THEME_COLORS.map(
  (_scheme, index) =>
    ({
      href: '/',
      children: `Nav Link ${index + 1}`,
      key: `nav-link-${index + 1}`,
    }) as CardAttributes
)
