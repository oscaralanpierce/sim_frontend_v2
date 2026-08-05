# Manual Testing

UI testing is complex and multifaceted. There are certain UI functions and states that are
impractical to test in a headless environment, and the DOM in such an environment doesn't always
offer perfect parallels to the browsers and devices that users will use. This means that manual
testing, in both development and production/production-like environments, plays a critical role.

## Table of Contents

- [Supported Devices and Browsers](#supported-devices-and-browsers)
- [Manual Test Process](#manual-test-process)

## Supported Devices and Browsers

Supported devices and browsers are outlined in [ADR 0008](/docs/adrs/0008-supported-devices-and-browsers.md).
Unfortunately, despite SIM's emphasis on [mobile-first development](/docs/adrs/0007-build-mobile-first.md),
it is impractical to manually test on mobile devices or tablets in development. This makes immediate
manual testing on deployment critical.

## Manual Test Process

Any PR that makes additions or changes to the UI - or has the potential to affect UI behaviour, such as React
contexts or refactors - must include a detailed manual testing plan. This testing plan must include edge cases
and possible regressions, not just the happy path. This testing can include not only observed UI behaviour but
also logging and errors as well as reviewing back-end logs and database state.

**The outlined process should specifically emphasise any behaviour that can't be tested, or can't be tested
accurately, in Vitest or Storybook.** It should be clear from a PR description that some behaviour doesn't have
adequate automated test coverage, which technical considerations made such test coverage impossible or impractical,
and how to fill the gaps with manual testing.

The documented manual test process for each PR should also clarify any differing behaviour on desktop and
mobile/tablet, such as touchscreen behaviour and gestures. Proposed manual testing processes are fair game
for PR reviewers as well, and feedback should be incorporated prior to merging the PR.

PR authors are expected to go through their own manual test process for desktop devices in all supported browsers
prior to merging their PRs, regardless of whether the PR is approved before testing is completed. Once deployed,
authors are expected to test in production on the same desktop browsers as well as supported mobile devices and
tablets. If an author doesn't have access to a particular device, they need to coordinate with a maintainer who
does to ensure the testing is done immediately on deploy.

Note that if the changes being deployed have any animations or transitions, they must be tested on a device with
a reduced motion setting enabled at the OS level once deployed. This is a critical accessibility consideration.
