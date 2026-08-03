# 0008. Supported Devices and Browsers

## Date

2026-08-04

## Approved By

@oscaralanpierce

## Decision

We will support the following devices and browsers:

- Safari (iOS)
- Safari (iPadOS)
- Brave (desktop)
- Google Chrome (desktop)

These are listed in order of priority, in keeping with [ADR 0007](/docs/adrs/0007-build-mobile-first.md).
Support for Android or GrapheneOS may be added in the future.

## Glossary



## Context

In order to establish a clear manual testing process, it is necessary to understand which exact devices
and browsers will be supported.

## Alternatives Considered

There are a multitude of possible devices and browsers to support, and we didn't consider most of them.
The reality is that we already know what our user base will be using to access SIM on each device. As
such, while we attempted to anticipate possible future changes in usage patterns - in particular in the
inclusion of Google Chrome - we didn't really consider other options.

## Considerations

We already know which devices our user(s) will want to use and which browsers they'll use to access the site
on those devices. Thus, the purpose of this ADR is to create a record the devices and browsers we want to support
rather than to explore alternatives.

The one wildcard here is Google Chrome. Our users prefer not to use Chrome. However, since it is a much more common
browser than Brave in general, it seemed wise to include support - especially since the Chromium engine is used in
numerous browsers.

## Summary

We will support and test on Safari (for iOS and iPadOS) and Brave and Google Chrome (for desktop).
