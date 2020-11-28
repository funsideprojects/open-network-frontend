import { RESET_ALL_STORE } from './common'

// ? Actions types
export const SET_FOLLOW = 'SET_FOLLOW'
export const OPEN_FOLLOW_DRAWER = 'OPEN_FOLLOW_DRAWER'
export const CLOSE_FOLLOW_DRAWER = 'CLOSE_FOLLOW_DRAWER'
export const CLEAR_FOLLOW_STORE = 'CLEAR_FOLLOW_STORE'

// ? Initial state
export const followInitialState = {
  following: {
    count: 0,
    users: [],
  },
  isDrawerVisible: false,
}

// * Types
export type FollowActionType =
  | typeof SET_FOLLOW
  | typeof OPEN_FOLLOW_DRAWER
  | typeof CLOSE_FOLLOW_DRAWER
  | typeof CLEAR_FOLLOW_STORE
  | typeof RESET_ALL_STORE
interface IAction {
  type: FollowActionType
  payload: any
}

// ? Reducer
export const followReducer = (state = followInitialState, action: IAction): typeof followInitialState => {
  switch (action.type) {
    case SET_FOLLOW:
      return {
        ...state,
        following: action.payload,
      }

    case OPEN_FOLLOW_DRAWER:
      return {
        ...state,
        isDrawerVisible: true,
      }

    case CLOSE_FOLLOW_DRAWER:
      return {
        ...state,
        isDrawerVisible: false,
      }

    case CLEAR_FOLLOW_STORE:
    case RESET_ALL_STORE:
      return followInitialState

    default:
      return state
  }
}
