# 0005. Use TanStack Query to Manage Data State

## Date

2026-08-01

## Approved By

@oscaralanpierce

## Decision

We will use TanStack Query to manage data state in the UI.

## Glossary

- **Component Lifecycle:** The three stages a React component goes through between birth (mounting), life
  (updating), and death (unmounting)
- **Context:** A React construct that enables data to be deeply shared within a component tree, eliminating
  the need to pass data from one component through a tree of children as props
- **TanStack Query:** A library used to fetch, cache, synchronize and update server state in a front-end
  application

## Context

We need a way to get data from the API into the UI. This entails retrieving the data at the right time, updating
it across the component tree as needed, and managing the component lifecycle. The primary options are TanStack Query
and React contexts. We used React contexts for this purpose and had a few actual and potential pain points that could
be mitigated with TanStack Query.

There is an additional library with similar functionality, [SWR](https://swr.vercel.app/), but it doesn't appear to
meet our [criteria for third-party libraries](/docs/adrs/0003-avoid-third-party-packages.md) as well as TanStack Query.

## Alternatives Considered

- React contexts
- TanStack Query
- SWR

## Considerations

Many of the pain points we had using contexts in V1 have been remediated in V2 by the new design of the API wrapper
(this will be elaborated in a future ADR). We were able to solve problems like data consistency and updating without
too much effort, and there are changes we can easily make to V2 to further improve these solutions. TanStack Query has
built-in functionality to mark data as stale and re-fetch without too much custom code. It also solves a potential
race condition between API calls that V1 handled, but with some effort.

Another consideration is that we have not yet fully fleshed out our roadmap after landing on new features and data
modelling. The result is that we want a state management solution that is fully-featured enough to be extensible. For
example, if we end up with more than two or three layers of nested resources (e.g., `playthroughs` and `catalogs` as
top-level models with the former being required to manage `ledgers` and all three being required to manage
`ledger_entries`), we end up with a structure like this:

```tsx
<PageLayout title="Ledger Entries">
  <PlaythroughsProvider>
    <PlaythroughsDropdown onSelect={(e) => selectPlaythrough(e.target.value)} />

    <UniversalCatalogProvider>
      <LedgerProvider>
        <LedgerTable />
      </LedgerProvider>
    </UniversalCatalogProvider>
  </PlaythroughsProvider>
</PageLayout>
```

The result is three layers of contexts in which the `LedgerProvider` must always be nested in both a `PlaythroughsProvider`
and a `UniversalCatalogProvider`, which are conceptually at the same level even though the structure necessitates one
appearing to also depend on the other. This is the type of problem TanStack Query is meant to solve with data keys. It
enables the whole state to be managed with just one `QueryClientProvider`.

TanStack Query has one important drawback in testing: Whereas with React contexts it is possible to mock a context value
without stubbing an actual API call, using TanStack Query would necessitate using MSW to mock API calls, requiring some
test wiring overhead and possibly impacting test reliability. However, we have had minimal problems with mocking data using
MSW in V1, so this tradeoff is acceptable in exchange for TanStack Query's futureproofing.

It is worth mentioning that SWR offers some of the same features as TanStack Query. Its lighter-weight style might make it
more suitable for our current version, however, it would negate the futureproofing value we get from TanStack Query, which
would be the biggest draw.

## Summary

The advantages of TanStack Query over React contexts are modest, but they do simplify our code and make it more robust such
that writing our own code to achieve the same results would be inordinately complex. Since the library is well supported,
well-documented, and actively maintained, it clears our bar for inclusion of third-party libraries. We will use TanStack
Query.

## Resources and References

- [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [SWR docs](https://swr.vercel.app/)
