# 0013. Config-Driven Routing

## Date

2026-08-05

## Approved By

@oscaralanpierce

## Decision

We will use a configuration file, `/src/routing/paths.ts`, to indicate which paths are available for
SIM pages. Paths will be assigned to `PageRoutes` by referencing this config.

## Context

We used this approach for the V1 front end and it worked well.

## Alternatives Considered

Because this approach worked well with the V1 front end, we didn't really consider other optimizations.

## Considerations

The page structure of the V2 front end will be similar enough to V1 that we expect the pattern that worked
well in V1 to continue serving us here.

## Summary

We will use paths defined in a config file to assign routes to pages in the V2 front end.
