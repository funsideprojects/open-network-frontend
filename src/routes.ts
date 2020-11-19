// ? All available routes for the app

// ? No auth needed routes
export const HOME = '/'
export const SIGN_IN = '/sign-in'
export const SIGN_UP = '/sign-up'
export const FORGOT_PASSWORD = '/forgot-password'
export const FORGOT_PASSWORD_PATH = `${FORGOT_PASSWORD}/:emailOrUsername`
export const RESET_PASSWORD = '/reset-password'

// ? Need auth routes
export const USER_PROFILE = '/profile'
export const USER_PROFILE_PATH = `${USER_PROFILE}/:username`
export const EXPLORE = '/explore'
export const PEOPLE = '/people'
export const NOTIFICATIONS = '/notifications'
export const MESSAGES = '/messages/:userId'
export const POST = '/post'
export const POST_PATH = `${POST}/:id`

// ?
export const NEW_ID_VALUE = 'new'
