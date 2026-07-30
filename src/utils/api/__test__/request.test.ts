import { describe, test, expect, vi, afterEach } from 'vitest'
import { apiRequest } from '../request'

const mockFetch = (impl: (...args: unknown[]) => unknown) => {
  vi.stubGlobal('fetch', vi.fn(impl))
}

describe('apiRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('when the response is successful', () => {
    test('resolves with the status and parsed body as data', async () => {
      mockFetch(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([{ id: 1, name: 'My Playthrough' }]),
        })
      )

      const result = await apiRequest('/api/playthroughs')

      expect(result).toEqual({
        status: 200,
        data: [{ id: 1, name: 'My Playthrough' }],
      })
    })
  })

  describe('when the API returns a documented error response', () => {
    test('resolves with the status and the errors array from the body', async () => {
      mockFetch(() =>
        Promise.resolve({
          ok: false,
          status: 422,
          json: () =>
            Promise.resolve({
              errors: ['Name must be unique', 'Name is too long'],
            }),
        })
      )

      const result = await apiRequest('/api/playthroughs')

      expect(result).toEqual({
        status: 422,
        errors: ['Name must be unique', 'Name is too long'],
      })
    })

    test('does not throw', async () => {
      mockFetch(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () =>
            Promise.resolve({
              errors: ['StandardError: Something went wrong'],
            }),
        })
      )

      await expect(apiRequest('/api/playthroughs')).resolves.not.toThrow()
    })
  })

  describe('when fetch itself fails (network error, CORS, etc.)', () => {
    test('resolves with status 0 and the exception message', async () => {
      mockFetch(() => Promise.reject(new TypeError('Failed to fetch')))

      const result = await apiRequest('/api/playthroughs')

      expect(result).toEqual({ status: 0, errors: ['Failed to fetch'] })
    })

    test('falls back to a generic message when a non-Error is thrown', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      mockFetch(() => Promise.reject('offline'))

      const result = await apiRequest('/api/playthroughs')

      expect(result).toEqual({
        status: 0,
        errors: ['An unexpected error occurred'],
      })
    })
  })

  describe('when the response body cannot be parsed as JSON', () => {
    test('resolves with status 0 and the parse exception message', async () => {
      mockFetch(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.reject(new SyntaxError('Unexpected end of JSON input')),
        })
      )

      const result = await apiRequest('/api/playthroughs')

      expect(result).toEqual({
        status: 0,
        errors: ['Unexpected end of JSON input'],
      })
    })
  })
})
