import { RESET_ALL_STORE } from './common'

// ? Actions types
export const CLEAR_MESSENGER_STORE = 'CLEAR_MESSENGER_STORE'

// ? Initial State
export const messengerInitialState = {}

// * Types
export type MessengerActionType = typeof CLEAR_MESSENGER_STORE | typeof RESET_ALL_STORE
interface IAction {
  type: MessengerActionType
  payload: any
}

// ? Reducer
export const messengerReducer = (state = messengerInitialState, action: IAction) => {
  switch (action.type) {
    case CLEAR_MESSENGER_STORE:
    case RESET_ALL_STORE: {
      return messengerInitialState
    }

    default:
      return state
  }
}
