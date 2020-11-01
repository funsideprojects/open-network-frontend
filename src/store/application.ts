import { RESET_ALL_STORE } from './common'

// ? Actions types
export const SET_RESPONSIVE_MODE = 'SET_RESPONSIVE_MODE'
export const SET_APP_NOTIFICATION = 'SET_APP_NOTIFICATION'

// ? Initial State
export const appInitialState = {
  responsiveMode: null,
  notification: {
    type: '',
    text: '',
    autoClose: true,
  },
}

// * Types
export type ApplicationActionType = typeof SET_RESPONSIVE_MODE | typeof SET_APP_NOTIFICATION | typeof RESET_ALL_STORE
interface IAction {
  type: ApplicationActionType
  payload: any
}

// ? Reducer
export const appReducer = (state = appInitialState, action: IAction): typeof appInitialState => {
  switch (action.type) {
    case SET_RESPONSIVE_MODE:
      return {
        ...state,
        responsiveMode: action.payload,
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
