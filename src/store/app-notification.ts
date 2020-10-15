import { RESET_ALL_STORE } from './common'

// ? Actions types
export const SET_APP_NOTIFICATION = 'SET_APP_NOTIFICATION'

// ? Initial State
export const appNotiInitialState = {
  content: {
    type: '',
    text: '',
    autoClose: true,
  },
}

// * Types
export type AppNotiActionType = typeof SET_APP_NOTIFICATION | typeof RESET_ALL_STORE
interface IAction {
  type: AppNotiActionType
  payload: any
}

// ? Reducer
export const appNotiReducer = (state = appNotiInitialState, action: IAction) => {
  switch (action.type) {
    case SET_APP_NOTIFICATION:
      return {
        ...state,
        content: action.payload,
      }

    case RESET_ALL_STORE:
      return appNotiInitialState

    default:
      return state
  }
}
