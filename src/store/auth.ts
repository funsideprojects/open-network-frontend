import { RESET_ALL_STORE } from './common'

// ? Action types
export const SET_AUTH_USER = 'SET_AUTH_USER'
export const RESET_AUTH_STORE = 'RESET_AUTH_STORE'

// ? Initial state
export const authInitialState = {
  user: null,
}

// * Types
export type AuthActionType = typeof SET_AUTH_USER | typeof RESET_AUTH_STORE | typeof RESET_ALL_STORE
interface IAction {
  type: AuthActionType
  payload: any
}

// ? Reducer
export const authReducer = (state = authInitialState, action: IAction) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      }

    case RESET_AUTH_STORE:
    case RESET_ALL_STORE:
      return authInitialState

    default:
      return state
  }
}
