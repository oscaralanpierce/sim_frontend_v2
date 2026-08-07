import React from 'react'
import { describe, test, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useColorScheme, useLogin } from '../contexts'
import { ColorContext } from '../../contexts/colorContext'
import { RED } from '../../utils/styles/colorSchemes'
import { LoginContext } from '../../contexts/loginContext'

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
      requireLogin: () => {}, // noop
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
