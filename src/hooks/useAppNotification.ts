import { useStore } from 'store'
import { SET_APP_NOTIFICATION } from 'store/application'

interface IOptions {
  text: string
  autoClose?: boolean
}

/** React hook for dispatching app notification */
export const useAppNotification = () => {
  const [, dispatch] = useStore()

  const success = (options: IOptions) =>
    dispatch({ type: SET_APP_NOTIFICATION, payload: { ...options, type: 'success' } })
  const info = (options: IOptions) => dispatch({ type: SET_APP_NOTIFICATION, payload: { ...options, type: 'info' } })
  const warn = (options: IOptions) => dispatch({ type: SET_APP_NOTIFICATION, payload: { ...options, type: 'warn' } })
  const error = (options: IOptions) => dispatch({ type: SET_APP_NOTIFICATION, payload: { ...options, type: 'error' } })

  return { success, info, warn, error }
}
