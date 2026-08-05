import React, { useContext } from 'react'
import { ColorContext } from '../contexts/colorContext'

const useCustomContext = <T>(cxt: React.Context<T>, msg: string) => {
  const context = useContext(cxt)

  if (!context) throw new Error(msg)

  return context
}

export const useColorScheme = () =>
  useCustomContext(
    ColorContext,
    'useColorScheme must be used within a ColorProvider'
  )
