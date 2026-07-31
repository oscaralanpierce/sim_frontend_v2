import { describe, test, expect, vi, afterEach } from 'vitest'
import { baseUri } from '../../sharedUtils'
import { apiRequest } from '../../request'
import {
  emptyPlaythroughs,
  allPlaythroughs,
} from '../../../../support/data/playthroughs'
import {
  getPlaythroughs,
  postPlaythroughs,
  deletePlaythrough,
} from '../playthroughEndpoints'

vi.mock('../../request', () => ({
  apiRequest: vi.fn(),
}))

const mockedApiRequest = vi.mocked(apiRequest)

describe('Playthrough endpoints', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /playthroughs', () => {
    test('requests the playthroughs endpoint with the token in the auth header', async () => {
      mockedApiRequest.mockResolvedValue({ status: 200, data: [] })

      await getPlaythroughs('some-token')

      expect(mockedApiRequest).toHaveBeenCalledWith(
        `${baseUri()}/playthroughs`,
        {
          headers: {
            Authorization: 'Bearer some-token',
          },
        }
      )
    })

    test('resolves with an empty array', async () => {
      const resolvedValue = {
        status: 200,
        data: emptyPlaythroughs,
      }
      mockedApiRequest.mockResolvedValue(resolvedValue)

      const result = await getPlaythroughs('some-token')

      expect(result).toBe(resolvedValue)
    })

    test('resolves with response data', async () => {
      const resolvedValue = {
        status: 200,
        data: allPlaythroughs,
      }
      mockedApiRequest.mockResolvedValue(resolvedValue)

      const result = await getPlaythroughs('some-token')

      expect(result).toBe(resolvedValue)
    })

    test('resolves in an error case as well', async () => {
      const resolvedValue = {
        status: 404,
        errors: ['Playthrough not found'],
      }
      mockedApiRequest.mockResolvedValue(resolvedValue)

      const result = await getPlaythroughs('some-token')

      expect(result).toBe(resolvedValue)
    })
  })

  describe('POST /playthroughs', () => {
    const body = {
      name: allPlaythroughs[0].name,
      description: allPlaythroughs[0].description,
    }

    test('makes a POST request with the token in the auth header', async () => {
      mockedApiRequest.mockResolvedValue({
        status: 201,
        data: allPlaythroughs[0],
      })

      await postPlaythroughs(body, 'some-token')

      expect(mockedApiRequest).toHaveBeenCalledWith(
        `${baseUri()}/playthroughs`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer some-token',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playthrough: body }),
        }
      )
    })

    test('resolves with whatever apiRequest resolves with', async () => {
      const resolvedValue = {
        status: 201,
        data: allPlaythroughs[0],
      }
      mockedApiRequest.mockResolvedValue(resolvedValue)

      const result = await postPlaythroughs(body, 'some-token')

      expect(result).toBe(resolvedValue)
    })

    test('resolves in an error case as well', async () => {
      const resolvedValue = {
        status: 422,
        errors: ['Name must be unique', 'Name is too long'],
      }
      mockedApiRequest.mockResolvedValue(resolvedValue)

      const result = await postPlaythroughs(body, 'some-token')

      expect(result).toBe(resolvedValue)
    })
  })

  describe('DELETE /playthroughs/:id', () => {
    test('makes a DELETE request to the endpoint indicated', async () => {
      mockedApiRequest.mockResolvedValue({
        status: 204,
        data: null,
      })

      await deletePlaythrough(27, 'some-token')

      expect(mockedApiRequest).toHaveBeenCalledWith(
        `${baseUri()}/playthroughs/27`,
        {
          headers: {
            Authorization: 'Bearer some-token',
          },
          method: 'DELETE',
        }
      )
    })

    test('resolves a success case', async () => {
      const resolvedValue = {
        status: 204,
        data: null,
      }
      mockedApiRequest.mockResolvedValue(resolvedValue)

      const result = await deletePlaythrough(27, 'some-token')

      expect(result).toBe(resolvedValue)
    })

    test('resolves an error case', async () => {
      const resolvedValue = {
        status: 404,
        errors: ['Playthrough not found'],
      }
      mockedApiRequest.mockResolvedValue(resolvedValue)

      const result = await deletePlaythrough(27, 'some-token')

      expect(result).toBe(resolvedValue)
    })
  })
})
