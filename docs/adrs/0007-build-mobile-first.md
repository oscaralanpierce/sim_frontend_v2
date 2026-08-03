# 0007. Build Mobile First

## Date

2026-08-04

## Approved By

@oscaralanpierce

## Decision

We will build the site mobile-first. In practical terms, this means we:

- Design the mobile experience and then expand it into a desktop site
- Use `min-width` rather than `max-width` media queries as a default
- Keep mobile UX, including touchscreen behaviour, top of mind during development

We will use the following standard breakpoints (min widths) and supported device sizes:

- 320px (mobile; minimum officially-supported device width)
- 469px (large mobile)
- 601px (small tablet)
- 769px (large tablet)
- 1201px (small desktop)
- 1405px (medium desktop)

We will test our designs at each of these viewport widths, as well as an unspecified larger
desktop width.

## Glossary

- **Breakpoint:** A particular viewport width used in a media query such that the styling
  of a particular page or component is different for widths smaller and larger than that
- **Viewport:** The device or browser window in which a user views the site

## Context

We expect our users to be console players primarily. Since console players will not be at a
desktop computer while using the application, we expect them to use primarily mobile or tablet
viewport widths. Of these, we expect the primary uses to be small/vertical mobile (320px - 468px)
and small/vertical tablet (601px - 768px). These devices and orientations will enable users to
see a large portion of the page content while also using a portable device.

## Alternatives Considered

The main alternative to mobile-first development is desktop-first, although it is possible to
primarily target another device type, such as tablet, as well.

## Considerations

The fact our primary user base is console players who will be using SIM on mobile devices is the
primary consideration informing this technical decision. Tablet use is likely to be common too,
however, tablet-first development is unusual and has key disadvantages, such as a mixture of
`min-width` and `max-width` media queries. In practical terms, there is no real disadvantage to
tablet users of mobile-first development.

It's likewise possible to provide good support for mobile while using a desktop-first approach.
However, it is difficult to give equal effort to UX on all devices, particularly factoring in
that desktop sites are primarily navigated with mice and keyboards rather than touchscreen
gestures.

The chosen breakpoints are based on industry standards.

## Summary

We will emphasise mobile and tablet design and UX, including touchscreen behaviour, during
development of SIM.
