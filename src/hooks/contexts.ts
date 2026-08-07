import React, { useContext } from 'react'
import { ColorContext } from '../contexts/colorContext'
import { LoginContext } from '../contexts/loginContext'

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

export const useLogin = () =>
  useCustomContext(LoginContext, 'useLogin must be used within a LoginProvider')
