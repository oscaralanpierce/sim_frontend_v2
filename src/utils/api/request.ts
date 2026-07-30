import { type ErrorObject } from '../../types/apiData'

export type ApiResult<T> =
  { status: number; data: T } | { status: number; errors: string[] }

const errorMessage = (e: unknown): string =>
  e instanceof Error ? e.message : 'An unexpected error occurred'

export const apiRequest = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<ApiResult<T>> => {
  let res: Response

  try {
    res = await fetch(input, init)
  } catch (e) {
    return { status: 0, errors: [errorMessage(e)] }
  }

  let json: unknown

  try {
    json = await res.json()
  } catch (e) {
    return { status: 0, errors: [errorMessage(e)] }
  }

  if (res.ok) return { status: res.status, data: json as T }

  return { status: res.status, errors: (json as ErrorObject).errors }
}
