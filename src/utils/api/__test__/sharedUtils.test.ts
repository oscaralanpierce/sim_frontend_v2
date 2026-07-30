import { describe, test, expect, vi } from 'vitest'
import { baseUri, combinedHeaders } from '../sharedUtils'

describe('API wrapper utils', () => {
  describe('baseUri', () => {
    afterEach(() => {
      vi.unstubAllEnvs()
    })

    describe('in a test environment', () => {
      test('is /api', () => {
        expect(baseUri()).toEqual('/api')
      })
    })

    describe('in other environments', () => {
      it('takes the value of VITE_API_URI', () => {
        vi.stubEnv('VITE_API_URI', 'https://google.com')
        expect(baseUri()).toEqual('https://google.com')
      })
    })
  })

  describe('combinedHeaders', () => {
    test('includes the token passed in the auth header', () => {
      expect(combinedHeaders('foobar')).toEqual({
        'Content-Type': 'application/json',
        Authorization: 'Bearer foobar',
      })
    })
  })
})
