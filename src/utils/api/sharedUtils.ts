export const baseUri = () => {
  return import.meta.env.VITE_API_URI ?? '/api'
}

const contentTypeHeader = { 'Content-Type': 'application/json' }
const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` })
export const combinedHeaders = (token: string) => ({
  ...contentTypeHeader,
  ...authHeader(token),
})
