import { describe, test, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { RED } from '../../utils/styles/colorSchemes'
import { useColorScheme, useLogin, useDashboardContext } from '../contexts'
import { ColorContext } from '../../contexts/colorContext'
import { LoginContext } from '../../contexts/loginContext'
import { DashboardContext } from '../../contexts/dashboardContext'

describe('useColorScheme', () => {
  test('works when rendered in a ColorContext', () => {
    const { result } = renderHook(() => useColorScheme(), {
      wrapper: ({ children }) => (
        <ColorContext value={RED}>{children}</ColorContext>
      ),
    })

    expect(result.current).toEqual(RED)
  })

  test('raises an error when rendered outside a ColorContext', () => {
    expect(() => {
      renderHook(() => useColorScheme())
    }).toThrow('useColorScheme must be used within a ColorProvider')
  })
})

describe('useLogin', () => {
  test('works when rendered in a LoginContext', () => {
    const contextValue = {
      user: null,
      authLoading: true,
    }

    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <LoginContext value={contextValue}>{children}</LoginContext>
      ),
    })

    expect(result.current).toEqual(contextValue)
  })

  test('throws an error when rendered outside a LoginContext', () => {
    expect(() => {
      renderHook(() => useLogin())
    }).toThrow('useLogin must be used within a LoginProvider')
  })
})

describe('useDashboardContext', () => {
  test('works when rendered in a DashboardContext', () => {
    const menuVisible = true
    const headerVisible = true
    const setMenuVisible = (_value: boolean) => {}
    const setHeaderVisible = (_value: boolean) => {}

    const { result } = renderHook(() => useDashboardContext(), {
      wrapper: ({ children }) => (
        <DashboardContext
          value={{
            menuVisible,
            headerVisible,
            setMenuVisible,
            setHeaderVisible,
          }}
        >
          {children}
        </DashboardContext>
      ),
    })

    expect(result.current).toEqual({
      headerVisible,
      menuVisible,
      setHeaderVisible,
      setMenuVisible,
    })
  })

  test('raises an error when rendered outside a DashboardContext', () => {
    expect(() => {
      renderHook(() => useDashboardContext())
    }).toThrow('useDashboardContext must be used within a DashboardProvider')
  })
})
