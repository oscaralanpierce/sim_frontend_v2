# 0003. Avoid Third-Party Packages

## Date

2026-08-01

## Approved By

@oscaralanpierce

## Decision

We will avoid third-party packages, preferring to write and maintain our own code. There are four
key exceptions:

- Key tech stack components like React, TypeScript, Vite, Vitest and Testing Library
- Official API wrappers and SDKs for APIs we integrate with, like Firebase
- Packages encapsulating extensive logic that would be a substantial burden to maintain ourselves
- Packages encapsulating logic involving expert knowledge in some technical area, especially when
  such logic pertains to security (e.g., cryptography)

Without exception, third-party packages must be actively maintained. New packages will only be added if
we have reasonable evidence that active maintenance will continue. If an API or other software doesn't
have an actively maintained package to support its use, in addition to our own implementation of such
code, we should also consider replacing that API or software with a better-supported solution.

We note that writing our own libraries and packages can be an option in cases where we want to write a
certain functionality in-house but adding the code to SIM directly would add maintenance burden or
jeopardize separation of concerns.

## Glossary

- **Active Maintenance:** The state of a package that receives regular updates, including bug fixes, peer
  dependency updates, and security patches, and, if open source, whose maintainers respond to issues, pull
  requests, and other community engagement in a timely fashion
- **Software Development Kit (SDK):** A package officially marketed to support an API or tool we integrate
  with, such as Firebase
- **Third-Party Package:** Any package or library maintained by anyone other than the SIM maintainers

## Context

As on Medium (see [Resources and References](#resources-and-references)), there are numerous considerations and
pitfalls to keep in mind when it comes to selecting which dependencies, if any, to include in a project. Most
third-party software fails, in some aspect, to clear what SIM maintainers consider a reasonable bar. Of particular
concern are code maintenance - whether a package is actively maintained and will continue to be so - and
compatibility issues.

## Alternatives Considered

It would be possible to have a preference _for_ third-party libraries - i.e., preferring not to write code when there is
a ready-made solution. This can save effort in the short run.

## Considerations

There are a few cases where it is undeniably preferable to use a third-party dependency. It is almost never advisable
to write home-rolled solutions for security concerns, especially in more complex spaces like cryptography. Standard
utilities like document parsers are also often good use cases for libraries, since document formats like JSON and CSV
may have numerous edge cases that may not be obvious to developers who aren't experts in these formats. In general, if
expert knowledge in a particular domain is required, a third-party library is the best option.

It is critical that the software we incorporate be actively maintained. While Dependabot can help us ensure that we are
using the latest versions of dependencies, what it doesn't do is flag dependencies that are in need of updates but haven't
gotten them. It is easy for out-of-date dependencies, or those that rely on legacy APIs or patterns, to fly under the radar,
creating tech debt that is never clearly surfaced as tech debt.

Third-party libraries depend on the code they are integrated with. Ideally, key peer dependencies are identified as such.
However, this is not guaranteed. It is also possible for two dependencies to be incompatible in non-obvious ways without
being formal peer dependencies at all. Furthermore, compatibility drift can become a big problem, and the likelihood of it
being a problem increases geometrically with the number of other dependencies a project has. Not only that, but when
a dependency is not widely used or represents a very niche use-case, it can be difficult to even find information about
compatibility with other packages.

## Summary

With the exception of the four cases noted under [Decision](#decision), we prefer to develop SIM functionality in-house.

## Resources and References

- [Choosing a Third-Party Library](https://dana-scheider.medium.com/choosing-a-third-party-library-e8b0f7aa9497)
