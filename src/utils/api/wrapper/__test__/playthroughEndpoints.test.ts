import { describe, test, expect, vi, afterEach } from 'vitest'
import { getPlaythroughs } from '../playthroughEndpoints'
import { baseUri, combinedHeaders } from '../../sharedUtils'
import { apiRequest } from '../../request'

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
          headers: combinedHeaders('some-token'),
        }
      )
    })

    test('resolves with whatever apiRequest resolves with', async () => {
      const resolvedValue = {
        status: 200,
        data: [{ id: 1, name: 'My Playthrough' }],
      }
      mockedApiRequest.mockResolvedValue(resolvedValue)

      const result = await getPlaythroughs('some-token')

      expect(result).toBe(resolvedValue)
    })
  })
})
