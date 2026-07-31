import { authHeader, baseUri, combinedHeaders } from '../sharedUtils'
import { apiRequest, type ApiResult } from '../request'
import {
  type RequestPlaythrough,
  type ResponsePlaythrough,
} from '../../../types/apiData'

const PLAYTHROUGHS_URI = `${baseUri()}/playthroughs`

/**
 * GET /playthroughs endpoint
 */

export const getPlaythroughs = (
  token: string
): Promise<ApiResult<ResponsePlaythrough[]>> => {
  return apiRequest(PLAYTHROUGHS_URI, {
    headers: authHeader(token),
  })
}

/**
 * POST /playthroughs endpoint
 */

export const postPlaythroughs = (
  params: RequestPlaythrough,
  token: string
): Promise<ApiResult<ResponsePlaythrough>> => {
  return apiRequest(PLAYTHROUGHS_URI, {
    method: 'POST',
    headers: combinedHeaders(token),
    body: JSON.stringify({ playthrough: params }),
  })
}
