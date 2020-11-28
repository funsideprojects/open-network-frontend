import { atom } from 'recoil'

import { AUTH_USER } from 'store/keys'

type UserState = {
  user?: { [key: string]: any }
}

const userState = atom<UserState>({
  key: AUTH_USER,
  default: {
    user: undefined,
  },
})

export default {
  userState,
}
