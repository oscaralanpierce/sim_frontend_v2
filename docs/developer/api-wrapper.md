# API Wrapper

The API wrapper (`/src/utils/api/`) is the only part of the front end that should call `fetch` directly. It wraps the SIM API in typed, resource-scoped functions that normalize every response — success or error — into a single result shape, so calling code never has to `try`/`catch` a documented API error.

## Table of Contents

- [The `ApiResult` Type and `apiRequest` Helper](#the-apiresult-type-and-apirequest-helper)
- [Error Response Shape](#error-response-shape)
- [API Data Types](#api-data-types)
- [Shared Request Utilities](#shared-request-utilities)
- [Wrapper Files](#wrapper-files)
- [Adding a New Resource or Endpoint](#adding-a-new-resource-or-endpoint)
- [Consuming Wrapper Functions](#consuming-wrapper-functions)

## The `ApiResult` Type and `apiRequest` Helper

[`/src/utils/api/request.ts`](/src/utils/api/request.ts) defines `ApiResult<T>` and the `apiRequest` function, which is the single place `fetch` is called from:

```ts
export type ApiResult<T> =
  | { status: 204; data: null } // 204 No Content is a special case
  | { status: number; data: T }
  | { status: number; errors: string[] }
```

`apiRequest` resolves with one of these three shapes for **any** response the API actually sends, including documented error responses like 401, 404, 422, and 500 — it does not reject for these. It also catches genuine transport failures (network errors, CORS failures, a response body that isn't valid JSON) and normalizes them to `{ status: 0, errors: [...] }`, using `0` as a sentinel for "no real HTTP response was received." Under normal operation, `apiRequest`'s promise should never reject.

This means callers determine success with a type-narrowing check rather than a `catch` block:

```ts
const result = await getPlaythroughs(token)

if ('data' in result) {
  // result.data is typed correctly here
} else {
  // result.errors is a string[] here
}
```

`result.status` is always available for status-specific handling (e.g. signing a user out on a 401), regardless of which branch was taken.

## Error Response Shape

Every error response from the API has the same JSON body shape, typed as `ErrorObject`:

```ts
export interface ErrorObject {
  errors: string[]
}
```

Most error responses include a single message, but 422 (validation) responses may include several.

## API Data Types

All request and response body types for API resources belong in `/src/types/apiData.d.ts` — not colocated with the wrapper files that use them. This keeps the wrapper files focused on request/response mechanics and gives you one place to look for the shape of any resource.

Naming convention:

- `Request<Resource>` for request bodies (e.g. `RequestPlaythrough`)
- `Response<Resource>` for response bodies (e.g. `ResponsePlaythrough`)

When adding types for a new resource, mirror the conventions already established for existing resources as closely as reasonable rather than introducing a new pattern — for example, timestamps are typed as `string` (not `Date`, since `res.json()` never produces `Date` instances), and nullable fields are marked `| null` rather than optional if the API can return an explicit `null`.

## Shared Request Utilities

`/src/utils/api/sharedUtils.ts` exports small helpers used across all wrapper files:

- `baseUri()` — resolves the API's base URL from the `VITE_API_URI` env var, defaulting to `/api` in environments, such as the Vitest environment, where this env var is not defined.
- `authHeader(token)` — an `Authorization: Bearer` header only, for requests with no body (GET, DELETE).
- `combinedHeaders(token)` — `authHeader` plus `Content-Type: application/json`, for requests with a JSON body (POST, PATCH).

## Wrapper Files

`/src/utils/api/wrapper/` contains one file per resource, named `<resource>Endpoints.ts` (e.g. `playthroughEndpoints.ts`). Do not group endpoints by HTTP verb or lump multiple resources into a shared file — each resource gets its own file regardless of how few or many endpoints it has.

Within a resource's file, each exported function corresponds to one endpoint and is named `<verb><Resource>`, matching whether the endpoint operates on the collection or a single member (e.g. `getPlaythroughs` for `GET /playthroughs`, `patchPlaythrough` for `PATCH /playthroughs/:id`).

Each function is a thin adapter over `apiRequest` — it builds the URL and headers and passes along the body, and returns whatever `apiRequest` resolves with, untouched:

```ts
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
```

No error handling, retries, or status-code branching belong in a wrapper function — that's `apiRequest`'s job, and status-specific reactions (like signing a user out) belong in the consuming context, not here.

## Adding a New Resource or Endpoint

1. Add `Request<Resource>` / `Response<Resource>` types to `/src/types/apiData.d.ts`, mirroring existing resource types.
2. Create (or extend) `/src/utils/api/wrapper/<resource>Endpoints.ts` with one function per endpoint, each delegating to `apiRequest`.
3. Add tests at the appropriate layer:
   - Tests for `apiRequest` itself (`/src/utils/api/__test__/request.test.ts`) cover response/error/transport-failure handling generically and shouldn't need to change for a new resource.
   - Tests for a resource's wrapper file (e.g. `/src/utils/api/wrapper/__test__/playthroughEndpoints.test.ts`) mock `apiRequest` and assert only that each function calls it with the correct URL, method, headers, and body, and passes its result through unchanged.

## Consuming Wrapper Functions

Wrapper functions are called with `async`/`await`, not `.then()`/`.catch()` chains, consistent with the project-wide preference for `async`/`await`. Because `apiRequest` normalizes documented API errors into `ApiResult` rather than rejecting, consuming code (primarily context providers) should use conditionals — typically `'data' in result` — to distinguish success from a documented error, and reserve `try`/`catch` for genuine exceptions rather than expected API error responses.
