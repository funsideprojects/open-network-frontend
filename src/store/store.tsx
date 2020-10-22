import React, { Dispatch, createContext, useContext, useReducer } from 'react'

import { appNotiReducer, appNotiInitialState, AppNotiActionType } from './app-notification'
import { authReducer, authInitialState, AuthActionType } from './auth'
import { followReducer, followInitialState, FollowActionType } from './follow'
import { messengerReducer, messengerInitialState, MessengerActionType } from './messenger'

/** Combine initial states */
const combinedStore = {
  appNoti: appNotiInitialState,
  auth: authInitialState,
  follow: followInitialState,
  messenger: messengerInitialState,
}

/** Combine action types */
type CombinedActionTypes = AppNotiActionType | AuthActionType | FollowActionType | MessengerActionType

// * Types
interface IAction<ActionTypes> {
  type: ActionTypes
  payload: any
}

/** React context for store */
const StoreContext = createContext<[typeof combinedStore, Dispatch<IAction<CombinedActionTypes>>]>([
  combinedStore,
  () => {},
])

/** Combine reducers */
const reducers = (selectedStore: typeof combinedStore, action: IAction<CombinedActionTypes>) => ({
  appNoti: appNotiReducer(selectedStore.appNoti, action as IAction<AppNotiActionType>),
  auth: authReducer(selectedStore.auth, action as IAction<AuthActionType>),
  follow: followReducer(selectedStore.follow, action as IAction<FollowActionType>),
  messenger: messengerReducer(selectedStore.messenger, action as IAction<MessengerActionType>),
})

/** Store context provider */
export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={useReducer(reducers, combinedStore)}>{children}</StoreContext.Provider>
)

/** React hook for consuming store */
export const useStore = () => useContext(StoreContext)
