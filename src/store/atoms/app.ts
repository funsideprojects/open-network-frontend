import { atom } from 'recoil'

import { APP_MESSAGE } from 'store/keys'

type AppMessageState = {
  type?: 'error' | 'warn' | 'info' | 'success'
  text?: string
  autoClose: boolean
}

const appMessageState = atom<AppMessageState>({
  key: APP_MESSAGE,
  default: {
    type: undefined,
    text: undefined,
    autoClose: true,
  },
})

export default {
  appMessageState,
}
