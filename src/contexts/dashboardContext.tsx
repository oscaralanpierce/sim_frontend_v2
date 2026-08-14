import { createContext, useState, useEffect } from 'react'
import { type ProviderProps } from '../types/contexts'

interface DashboardContextType {
  menuVisible: boolean
  headerVisible: boolean
  setMenuVisible: (value: boolean) => void
  setHeaderVisible: (value: boolean) => void
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
)

export const DashboardProvider = ({ children }: ProviderProps) => {
  const [menuVisible, _setMenuVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)

  // The menu should not be visible when the header is not.
  // The public setMenuVisible function, available to child
  // components, ensures the header has to be visible for the
  // menu to be displayed.
  const setMenuVisible = (value: boolean) => {
    if (!headerVisible && value === true) return

    _setMenuVisible(value)
  }

  useEffect(() => {
    if (!headerVisible) setMenuVisible(false)
  }, [headerVisible])

  return (
    <DashboardContext
      value={{ menuVisible, headerVisible, setMenuVisible, setHeaderVisible }}
    >
      {children}
    </DashboardContext>
  )
}
