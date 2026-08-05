import { createContext } from 'react'
import { type ProviderProps } from '../types/contexts'
import { YELLOW, type ColorScheme } from '../utils/styles/colorSchemes'

const ColorContext = createContext<ColorScheme | undefined>(undefined)

interface ColorProviderProps extends ProviderProps {
  colorScheme?: ColorScheme
}

const ColorProvider = ({
  colorScheme = YELLOW,
  children,
}: ColorProviderProps) => (
  <ColorContext value={colorScheme}>{children}</ColorContext>
)

export { ColorProvider, ColorContext }
