# 0012. Use Lighter-Weight Error Handling in V2 API Wrapper

## Date

2026-08-05

## Approved By

@oscaralanpierce

## Decision

We will remove the `ApiError` types used in the V1 front end and, instead of throwing errors in the
wrapper to be caught in the context, we will normalise expected API errors to be passed through with
a status and error data. Transport errors will be handled similarly, with a status code of 0.

## Glossary

- **Transport Error:** An error arising from an API call due to issues involving network connectivity,
  CORS configuration changes, or client (not user) authentication issues, preventing the API from ever
  processing and responding to the request

## Context

In V1 we had a rather ornate set of HTTP request and response types as well as, notably, `ApiError` and
subtypes like `AuthorizationError`, `NotFoundError`, etc., defined by narrowing on `status`. When such an
error was received from the API, within the wrapper, one of these error classes was thrown and then caught
in the contexts that called the wrapper functions.

This resulted in more code complexity than was worth it for what it got us, which was almost nothing except
code complexity.

## Alternatives Considered

- Repeat the API wrapper error handling pattern used in the V1 front end
- Use a lighter-weight approach: keep thrown errors to a minimum possible and provide consistent data structures
  to convey anticipated failures

## Considerations

Our experience with the error handling in V1 was sufficiently negative to prompt us to investigate an alternative.
Effectively, the decision to make a different design choice this time around was a foregone conclusion. The process
was then essentially subtractive: identifying elements that got in our way and removing them until we had a robust,
working system for handling errors that did not rely on a plethora of custom types and did not throw errors
unnecessarily.

## Summary

We will handle errors in the API wrapper by returning a uniform error object:

```ts
type ApiResult<T> =
  | { status: 204, data: null }
  | { status: number, data: T }
  | { status: number: errors: string[] }
```

In the case of a transport error or JSON parser error, status is set to `0`. In all other cases, it is an HTTP response
code.

Only in the case of truly unanticipated errors will we throw errors that need to be caught.
