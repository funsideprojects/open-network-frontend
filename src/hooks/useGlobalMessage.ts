import { ReactNotificationOptions, store } from 'react-notifications-component'
import deepMerge from 'deepmerge'
import { useSetRecoilState } from 'recoil'
import { StyledIcon } from '@styled-icons/styled-icon'

import { MessageContent } from 'components/App/Messages'
import { appAtoms } from 'store'

export enum MessageType {
  Default = 'default',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

interface NotificationOptions extends Omit<ReactNotificationOptions, 'type'> {
  type?: MessageType
}
type Options = Partial<NotificationOptions>
type AddArgs = Partial<{ Icon: StyledIcon; data: any; onRemoval: (id: string) => void }>

const baseConfig: Options = {
  container: 'bottom-left',
  insert: 'bottom',
  slidingEnter: {
    duration: 300,
  },
  slidingExit: {
    duration: 150,
  },
  dismiss: {
    onScreen: false,
    pauseOnHover: true,
    waitForAnimation: true,
    click: true,
    touch: true,
    showIcon: false,
  },
}

const animation = (type: MessageType, out: boolean = false) => {
  let animationName: string

  if (out) {
    animationName = 'fadeOut'
  } else {
    if ([MessageType.Danger].indexOf(type) > -1) {
      animationName = 'wobble'
    } else {
      animationName = 'fadeIn'
    }
  }

  return ['animate__animated', 'animate__faster', `animate__${animationName}`]
}

export const useGlobalMessage = () => {
  const setAppMessage = useSetRecoilState(appAtoms.appMessageState)

  return {
    add: (config: Options, args?: AddArgs) => {
      const now = Date.now()
      setAppMessage((prev) => ({ ...prev, [now]: args?.data }))

      const { title, message, type } = config
      const stylingConfig: Options = {
        id: now.toString(),
        animationIn: animation(config.type),
        animationOut: animation(config.type, true),
        dismiss: {
          duration: 2 * 1000, // ? 2s
        },
        content(id: string) {
          return MessageContent({ id, icon: args?.Icon, title, message, type })
        },
        onRemoval(id) {
          setAppMessage((prev) => {
            const newState = { ...prev }
            delete newState[id]

            return newState
          })

          if (args && typeof args.onRemoval === 'function') {
            args.onRemoval(id)
          }
        },
      }

      return store.addNotification(
        deepMerge.all<NotificationOptions>([baseConfig, stylingConfig, config], {
          // ? Overwrite merge
          arrayMerge: (destinationArray, sourceArray, options) => sourceArray,
        })
      )
    },
    remove: store.removeNotification,
  }
}
