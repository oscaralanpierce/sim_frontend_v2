import React from 'react'
import { describe, test, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useColorScheme } from '../contexts'
import { ColorContext } from '../../contexts/colorContext'
import { RED } from '../../utils/styles/colorSchemes'

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
