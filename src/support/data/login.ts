import { type User, type IdTokenResult } from 'firebase/auth'

/**
 * Ensure dates match requirements for token validity
 */

const now = new Date()

const thisYear = now.getFullYear()
const thisMonth = now.getMonth()
const today = now.getDay()
const thisHour = now.getHours()
const thisMinute = now.getMinutes()

const creationTime = new Date(thisYear)
const lastSignInTime = new Date(thisYear, thisMonth, today, thisHour)

const expirationTime = () => {
  if (thisHour === 23) {
    return new Date(thisYear, thisMonth, today + 1)
  } else {
    return new Date(thisYear, thisMonth, today, thisHour + 1)
  }
}

const tokenIssuanceTime = () => {
  if (thisMinute < 2) {
    return new Date(thisYear, thisMonth, today, thisHour - 1, 59)
  } else {
    return new Date(thisYear, thisMonth, today, thisHour, thisMinute - 2)
  }
}

const unixEpoch = (date: Date) => Math.floor(date.getTime()) / 1000

/**
 * Export test data
 */

export const TEST_USER_UID = '123'
export const TEST_USER_DISPLAY_NAME = 'Jane Doe'
export const TEST_USER_EMAIL = 'jane.doe@gmail.com'
export const TEST_USER_PHOTO_URL = 'https://example.com/img/janedoe.png'

export const TEST_USER: User = {
  displayName: TEST_USER_DISPLAY_NAME,
  email: TEST_USER_EMAIL,
  emailVerified: true,
  isAnonymous: false,
  phoneNumber: null,
  photoURL: TEST_USER_PHOTO_URL,
  providerId: 'foobar',
  uid: TEST_USER_UID,
  metadata: {
    creationTime: creationTime.toUTCString(),
    lastSignInTime: lastSignInTime.toUTCString(),
  },
  providerData: [
    {
      displayName: TEST_USER_DISPLAY_NAME,
      email: TEST_USER_EMAIL,
      phoneNumber: null,
      photoURL: TEST_USER_PHOTO_URL,
      providerId: 'foobar',
      uid: TEST_USER_UID,
    },
  ],
  getIdToken: () => new Promise<string>(() => 'idtoken'),
  refreshToken: 'refreshtoken',
  tenantId: 'TENANT_PROJECT_ID',
  delete: () => new Promise<void>(() => {}),
  toJSON: () => ({ foo: 'bar' }),
  getIdTokenResult: () =>
    new Promise<IdTokenResult>(() => ({
      authTime: lastSignInTime.toUTCString(),
      expirationTime: expirationTime().toUTCString(),
      issuedAtTime: lastSignInTime.toUTCString(),
      signInProvider: null,
      signInSecondFactor: null,
      token: 'header.payload.signature',
      claims: {
        exp: unixEpoch(expirationTime()).toString(),
        iat: unixEpoch(tokenIssuanceTime()).toString(),
        sub: TEST_USER_UID,
        auth_time: unixEpoch(lastSignInTime).toString(),
      },
    })),
  reload: () => new Promise<void>(() => {}),
}
