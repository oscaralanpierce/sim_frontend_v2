# 0001. Build V2 Front End

## Date

2026-08-01

## Approved By

@oscaralanpierce

## Decision

We will build a V2 front end for Skyrim Inventory Management

## Glossary

- **Canonical Data:** Data that canonically exists in Skyrim, representing items, characters, locations, quests
  or objectives in-game
- **Operational Ledger:** A record indicating the status of operational items, such as inventory items or items
  required for procurement

## Context

In light of numerous issues with the data model of the Skyrim Inventory Management API, we have decided
to build a V2 API. As part of the V2 API, we will be overhauling how we conceptualize canonical data
and how we identify items as being inventory or required for procurement, moving to an operational ledger model.
(More details on these decisions are available in the backend ADRs linked under [Resources and References](#resources-and-references).)

This changed data model will affect the way we fetch data from the API and how we need to display it in the front end.
One of the key changes affecting our decision on whether to modify the existing front end or write a V2 was the decision
to scrap inventory and wish lists, consolidating these into a single operational ledger. The implication of this is that
we will want to display the ledger on a single page with front-end filters that enable a user to see only inventory or
only items to be procured.

## Alternatives Considered

We considered two alternatives: build a V2 front end or modify the existing front end to accommodate the new data model.

## Considerations

The decision was ultimately easy. There were almost no components of the existing front end that could be reused for the
new functionality. That means that we would be adding new elements to the V1 front end and ultimately deleting the elements
that already existed. Keeping the V1 front end, therefore, would essentially mean retaining tech debt (outdated patterns and
libraries, mainly) while changing everything else.

## Summary

We will build a V2 front end instead of modifying V1.

## Resources and References

Related back-end ADRs:

- [0001. Build New V2 API](https://github.com/oscaralanpierce/sim_api_v2/blob/main/docs/adrs/0001-build-new-v2-api.md)
- [0004. Use Universal Catalog Table](https://github.com/oscaralanpierce/sim_api_v2/blob/main/docs/adrs/0004-use-universal-catalog-table.md)
- [0006. Consolidate Inventory and Procurement List into Operational Ledger](https://github.com/oscaralanpierce/sim_api_v2/blob/main/docs/adrs/0006-consolidate-inventory-and-procurement-lists-into-operational-ledger.md)
