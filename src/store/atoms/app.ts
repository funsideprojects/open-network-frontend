import { atom } from 'recoil'

import { APP_MESSAGE, SEARCH_RESULT } from 'store/keys'

// ? Message
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

// ? Search
type SearchResultState = {
  searchQuery: string
  offset: number
  limit: number
  result: {
    count?: number
    users?: Array<{
      id: string
      fullName: string
      username: string
      image: string
      online: boolean
    }>
  }
}

const searchResultState = atom<SearchResultState>({
  key: SEARCH_RESULT,
  default: {
    searchQuery: '',
    offset: 0,
    limit: 5,
    result: {
      count: undefined,
      users: undefined,
    },
  },
})

export default {
  appMessageState,
  searchResultState,
}
