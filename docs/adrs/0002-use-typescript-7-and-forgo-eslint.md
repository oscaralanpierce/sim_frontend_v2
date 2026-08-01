# 0002. Use TypeScript 7 and Forgo ESLint

## Date

2026-08-01

## Approved By

@oscaralanpierce

## Decision

We will use TypeScript 7 despite a lack of ESLint support. If a linting solution becomes available for TypeScript
7, we will adopt it.

## Glossary

- **ESLint:** A standard linting tool used for JavaScript and TypeScript
- **Prettier:** A code formatter for JavaScript and TypeScript
- **typescript-eslint:** A plugin enabling ESLint to support TypeScript syntax

## Context

The [typescript-eslint](https://typescript-eslint.io/) plugin does not support TypeScript 7. This is
a result of TypeScript 7's transition to a Go engine, which provides no stable JavaScript API as required
by ESLint. As such, there is no linting available for TypeScript 7, making the decision to opt for TypeScript
7 over TypeScript 6 less straightforward.

## Alternatives Considered

- Use TypeScript 7 and forgo linting
- Use TypeScript 6 with ESLint until a TypeScript 7 linting solution is available

## Considerations

Keeping dependencies up-to-date is very important to us as maintainers of SIM. The ability to update dependencies
freely is critical to forward compatibility, security, and keeping technical debt to a minimum. We avoid decisions
that will impede future dependency updates.

Code quality and consistency are also important. They make code more readable and maintainable. Linters like ESLint
have a key role to play.

One of our key considerations is the fact that ESLint support for TypeScript 7 is not planned. That leaves open the
question of what we would do if TypeScript 6 maintenance ended before a linting solution was available for
TypeScript 7. We would then face the decision to continue using an unsupported TypeScript version or forgo linting support.

There is another tool, Prettier, that can mitigate the absence of ESLint. While it doesn't offer comprehensive linting
functions, it does handle code formatting, enabling some standardization.

## Summary

We will use TypeScript 7 without ESLint. We will adopt a TypeScript 7 linting solution when and if one becomes available.
In the meantime, we will use Prettier for code formatting.

## Resources and References

- typescript-eslint [issue and thread](https://github.com/typescript-eslint/typescript-eslint/issues/10940)
  explaining infeasibility of implementing TypeScript 7 support for ESLint
