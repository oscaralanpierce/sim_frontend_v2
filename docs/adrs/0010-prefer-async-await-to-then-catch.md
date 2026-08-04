# 0010. Prefer `async`/`await` to `.then()`/`.catch()`

## Date

2026-08-04

## Approved By

@oscaralanpierce

## Decision

For the V2 front end, we will prefer `async`/`await` syntax to the promise `.then()`/`.catch()` syntax
used in V1.

## Glossary

- **Asynchronous (Async) Behavior:** Application behavior where a particular action, such as displaying a
  UI element, must wait for another action to succeed, and that action takes place in a different system
  or thread and may complete at an unspecified time; in the context of SIM, asynchronous behavior mostly
  centers around calling the API and displaying data
- **Promise:** An approach to handling async code in JavaScript in which a promise object is "resolved" with
  a function passed to `.then()` (when the async behavior is successful) and errors are handled with a
  function passed to `.catch()`, which is chained onto the `.then()` call

## Context

In V1, we preferred `.then()`/`.catch()` promise resolution to `async`/`await` syntax:

```ts
/**
 * V1 .then()/.catch() syntax
 */

makeApiCall()
  .then((response) => {
    if (response.status === 401) {
      signOutUser()
      return
    }

    return response
      .json()
      .then((json) => {
        // set content state to enable UI
        // to display data
      })
      .catch((e) => {
        // error handling behavior for parsing JSON
      })
  })
  .catch((e) => {
    // error handling behavior for API call
  })

/**
 * V2 async/await syntax
 */

try {
  const response = await makeApiCall()

  if (response.status === 401) {
    signOutUser()
  }

  const json = await response.json()

  if ('data' in json) {
    renderSuccess(json.data)
  } else {
    renderErrors(json.errors)
  }
} catch (e) {
  // handle unexpected error behavior for API
  // call or JSON parsing, distinguished by error
  // type and/or message
}
```

## Alternatives Considered

The two main ways to handle async behavior in JavaScript apps are promise resolution and `async`/`await`.
Sometimes, one or the other syntax is not possible due to the syntax used in library code, for example.
Promise resolution has a couple of essentially similar approaches: you can use the `.then()`, `.catch()`,
`.resolve()`, and `.reject()` functions to work with promises. In SIM V1 we used `.then()` and `.catch()`
exclusively, so that was the primary alternative approach we considered here.

## Considerations

As is illustrated in the above examples, the promise syntax used in V1 can quickly result in deeply nested
code. This coupled with other design decisions in V1, to be discussed in an upcoming ADR, led to code that
was wordy, deeply nested, unmaintainable and, at times, hard to test. The `async`/`await` syntax is expected to
result in cleaner, more maintainable, and more testable code.

## Summary

We will prefer `async`/`await` syntax for async behavior whenever possible over the `.then()`/`.catch()` syntax.
