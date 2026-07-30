import { baseUri, combinedHeaders } from '../sharedUtils'
import { apiRequest, type ApiResult } from '../request'
import { type ResponsePlaythrough } from '../../../types/apiData'

/**
 * GET /playthroughs endpoint
 */

export const getPlaythroughs = (
  token: string
): Promise<ApiResult<ResponsePlaythrough[]>> => {
  return apiRequest(`${baseUri()}/playthroughs`, {
    headers: combinedHeaders(token),
  })
}
