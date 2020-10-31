import { RESET_ALL_STORE } from './common'

// ? Actions types
export const SET_APP_NOTIFICATION = 'SET_APP_NOTIFICATION'
export const SET_SERVER_AVAILABILITY = 'SET_SERVER_AVAILABILITY'

// ? Initial State
export const appInitialState = {
  serverAvailable: true,
  notification: {
    type: '',
    text: '',
    autoClose: true,
  },
}

// * Types
export type ApplicationActionType =
  | typeof SET_APP_NOTIFICATION
  | typeof SET_SERVER_AVAILABILITY
  | typeof RESET_ALL_STORE
interface IAction {
  type: ApplicationActionType
  payload: any
}

// ? Reducer
export const appReducer = (state = appInitialState, action: IAction): typeof appInitialState => {
  switch (action.type) {
    case SET_SERVER_AVAILABILITY:
      return {
        ...state,
        serverAvailable: action.payload,
      }

    case SET_APP_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      }

    case RESET_ALL_STORE:
      return appInitialState

    default:
      return state
  }
}
