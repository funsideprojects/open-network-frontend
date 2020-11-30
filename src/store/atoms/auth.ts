import { atom } from 'recoil'

import { AUTH_USER } from 'store/keys'

type UserState = {
  user?: {
    id: string
    fullName: string
    email: string
    username: string
    image?: string
    imagePublicId?: string
    coverImage?: string
    coverImagePublicId?: string
    visibleToEveryone: boolean
    online: boolean
    displayOnlineStatus: boolean
    lastActiveAt: number
    createdAt: number
    updatedAt: number
  }
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
