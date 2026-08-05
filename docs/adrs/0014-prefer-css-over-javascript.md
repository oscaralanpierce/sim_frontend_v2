# 0014. Prefer CSS Over JavaScript

## Date

2026-08-06

## Approved By

@oscaralanpierce

## Decision

We will prefer CSS over JavaScript when the implementation of a feature is feasible and will be
maintainable in either.

The qualifier here is "feasible and will be maintainable". This means:

- One implementation won't take drastically longer than the other
- The code for both implementations will be robust, readable, and well-organised
- One implementation won't take drastically more code than the other (negotiable if
  good encapsulation and separation of concerns is possible)

For the first bullet point, note that this consideration will assume equal developer skill in JavaScript
and CSS. In other words, a developer being less skilled in CSS and that implementation therefore taking
longer is not a reason to choose JavaScript.

A final note on animations: we have noted in a past ADR that we
[highly value accessibility](/docs/adrs/0004-prioritize-accessibility.md). Animations can present particular
challenges in this aspect. Components using animations must be designed to:

1. Be accessible to screen readers
2. Be accessible to users whose OS-level accessibility settings include a preference for
   [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

## Glossary

- **Web Animations API:** A JavaScript API for building complex animations, supported natively in most
  modern browsers

## Context

Many aspects of visual design - resizing elements, animations, etc. - are possible in both CSS and JavaScript.
Despite certain advantages of using JavaScript - it is much more testable with automated tests and undeniably
easier when you don't know all the finer points of CSS - CSS is preferred for most simple, and some more complex,
animations due to being lightweight, performant, and providing certain advantages like the `transitionend` event
that can be listened to in JavaScript.

## Alternatives Considered

- Prefer JavaScript for animations and transitions
- Prefer CSS for animations and transitions

## Considerations

Modern browsers have better support for JavaScript animations, making this decision a little less important than
it was in the past. However, there are still some considerations.

### Why Not Both?

Sometimes, JavaScript can be used to add or remove a class, using CSS to define a transition when that class is
added or removed. This is a pattern that we will use as appropriate. **There is no reason to avoid adding or removing
classes from elements using JavaScript.**

### Simplicity

It can be easier for developers to animate using JavaScript, but the result can be less performant.

### Accessibility

CSS provides access to media queries for accessibility settings like `prefers-reduced-motion`. It is harder to
detect and accommodate these user preferences in JavaScript.

### Testability

Using CSS for animations and transitions makes the code untestable in a headless browser like JSDOM. However,
JavaScript-based animations aren't always testable either. For this reason, we should use judgment when including
animations at all. All PRs including animated elements must include thorough manual testing plans, noting which
functionality is not covered by automated tests.

Production testing should include testing on a device with a reduced motion setting turned on at the OS level.
If the animation or transition behavior differs at different viewport widths, devices with this setting at
each relevant width range should be used during testing.

## Summary

We will prefer CSS animations over JavaScript when all else is equal. More complex animations can be animated
using JavaScript's Web Animations API. All animations and animated transitions should be accessible to screen
readers and include provisions for the `prefers-reduced-motion` setting.

## Resources and References

- [CSS versus JavaScript animations](https://web.dev/articles/css-vs-javascript)
