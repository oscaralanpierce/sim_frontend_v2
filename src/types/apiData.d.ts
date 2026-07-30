/**
 * Generic type for the JSON body of any error response
 */

export interface ErrorObject {
  errors: string[]
}

/**
 * Playthrough
 */

export interface RequestPlaythrough {
  name?: string | null
  description?: string | null
}

export interface ResponsePlaythrough {
  id: number
  user_id: number
  name: string
  description: string | null
  created_at: string // timestamp as string
  updated_at: string // timestamp as string
}
