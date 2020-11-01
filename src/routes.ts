// ? All available routes for the app

// ? No auth needed routes
export const HOME = '/'
export const SIGN_UP = '/sign-up'
export const FORGOT_PASSWORD = '/forgot-password'
export const RESET_PASSWORD = '/reset-password'

// ? Need auth routes
export const USER_PROFILE = '/:username'
export const EXPLORE = '/explore'
export const PEOPLE = '/people'
export const NOTIFICATIONS = '/notifications'
export const MESSAGES = '/messages/:userId'
export const POST = '/post/:id'

// ?
export const NEW_ID_VALUE = 'new'
