# 0009. Component Architecture

## Date

2026-08-04

## Approved By

@oscaralanpierce

## Decision

We will use a three-tier component hierarchy:

- Page components (stored in `/src/pages/`) are components that have their own routes
- Layout components (stored in `/src/layouts/`) are components that "wrap" the contents of a page, providing an
  overarching visual design
- Plain components (stored in `/src/components/`) are components that make up the elements contained in a
  layout

A layout component is defined as a component that provides the overall visual design of a page. A component can be
a plain component even if it has children, provided it does not encapsulate a page-level design. A page may contain
both a layout and nested plain components. A page may not have a layout if it doesn't share top-level design elements
with other pages.

## Glossary

- **Layout Component:** A React component representing top-level design elements, such as headers and containers, common
  to multiple pages
- **Page Component:** A React component that is rendered directly at a specific route (may be rendered within one or
  more context providers where appropriate)
- **Plain Component:** Any React component that is not a page or layout component

## Context

In V1 of SIM, it worked well to separate design elements into this hierarchy, so we'll continue the pattern with the
V2 front end.

## Alternatives Considered

- Storing all components in `/src/components`
- Combining layouts and plain components into a single category while keeping pages separate
- Grouping components by which page they are used on

## Considerations

React apps are known for evolving to include a multitude of components. For this reason, it makes sense to categorise
components somehow. This hierarchy represents a logical grouping.

Another approach to categorisation is to have page components and then group other components into subdirectories based
on which page uses them. However, one of the most powerful features of React is enabling common design elements to be
incorporated into multiple pages, and a component that is bundled in with a particular page may need to be moved around
and generalised in the future.

If filename collisions become a problem in the future, we might consider more granular groupings of plain components, but
for now that would be a premature optimisation.

## Summary

We will use a hierarchy of components including pages, which have their own routes; layouts, which represent top-level
structural elements common to multiple pages; and plain components, which are children of pages and layouts. Any of these
components may be wrapped in context providers as appropriate.
