# 0004. Prioritize Accessibility

## Date

2026-08-01

## Approved By

@oscaralanpierce

## Decision

Accessibility will be considered a first-class concern in development of SIM, as important as UX for abled users.

## Glossary

- **a11y:** A community project oriented around improving web accessibility for disabled users and developing accessibility
  standards and practices
- **Assistive Technology:** Any technology, such as a screen reader, that enables a disabled user to use the web more easily

## Context

JavaScript applications are notoriously inaccessible to disabled users. Magical UI changes are often not usable at all by users
who depend on screen readers, keyboard navigation, and semantic HTML to navigate web sites. Accessibility can affect abled users
as well, for example, those who prefer to disable JavaScript or find it more convenient to navigate pages with a keyboard rather
than a mouse.

## Alternatives Considered

Accessibility may be viewed as a cost-benefit decision, especially for applications like SIM that are intended for specific
individuals. However, in light of the fact that disability can arise suddenly in previously abled individuals, it is logical
even for this type of project to prioritise accessibility.

## Considerations

Disability can arise in any person at any time, sometimes without warning. Much of the web is inaccessible to users with
disabilities like vision impairment and dyslexia. When a group of people never becomes users due to inaccessibility, it can
create the impression that disability is uncommon and that accessibility has limited benefits. However, anyone who lives long
enough will eventually experience some form of disability, whether temporary or chronic. Therefore, accessibility is important
both for fairness and for the practical aspect of enabling a product to be used by the most users, and enabling those users to
continue using the product should they become disabled.

In general, JavaScript is a minefield when it comes to accessibility. The fundamental decision to use JavaScript has been made,
since JavaScript is required to integrate with an API such as ours in the way that we need. However, by treating accessibility
as a first-class consideration, we can ensure that our product is available, and continues to be available, to all.

## Summary

Accessibility is a first-class concern for SIM maintainers.

## Resources and References

- [A11y Project web site](https://a11yproject.com)
- [MDN Accessibility Information](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
