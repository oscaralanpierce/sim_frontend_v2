# 0011. Use Updated Firebase SDK for Google Login

## Date

2026-08-04

## Approved By

@oscaralanpierce

## Decision

We have decided to use the updated Firebase SDK to handle Google login, rather than replicate the
bespoke approach used in V1.

## Glossary

- **JSON Web Token (JWT):** A token consisting of a header, payload, and signature, encoded with a
  particular private key and decoded using the corresponding public key; the payload can contain
  arbitrary JSON keys in addition to certain standard values
- **Software Development Kit (SDK):** An officially-supported library providing API wrappers and other
  utilities for integrating with a particular third-party service
- **Token:** A string that uniquely identifies a user and enables an application to verify the identity
  of a signed-in user as well as the validity of their login
- **Token Refresh:** A mechanism for renewing a user's login "behind the scenes" when they are signed
  into a third-party identity provider, in this case Google, but their login token for SIM has expired

## Context

When we built the V1 front end, the Firebase SDK didn't provide easy integration of Google sign-in with
React. This necessitated building more of our own functionality, including a home-rolled approach to
token storage and refresh behavior. Now, the latest version of the Firebase SDK incorporates a new Google
auth API that uses JWTs refreshed automatically using the SDK's utilities. The JWTs are encoded with the
user's sign-in information, eliminating the need for an API call to validate the token; the only required
call to Google's API is to retrieve the public key used to decode the token. This `GET` request is almost
guaranteed to succeed, preventing login issues related to API factors and not actual authentication errors.

The JWTs received from Google on login can also be validated by the back end, enabling us to authenticate
the front end and the API with the same tokens. This is the preferred approach per the Google documentation
linked under [Resources and References](#resources-and-references).

## Alternatives Considered

- Implementing the same authentication pattern used in the V1 front end
- Updating our approach to use the updated Firebase SDK and JWT API

## Considerations

Since the Firebase SDK is officially supported and recommended by Google, updating our approach to use the new
utility was the obvious choice. This is particularly important given that the functionality in question pertains
to security and auth.

## Summary

We will use the new Firebase SDK utilities to effect Google login for the V2 front end.

## Resources and References

- [OAuth 2 in Action](https://www.manning.com/books/oauth-2-in-action) (book)
- [Authenticate Using Google with JavaScript](https://firebase.google.com/docs/auth/web/google-signin) (Firebase docs)
