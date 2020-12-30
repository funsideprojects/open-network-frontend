import { atom } from 'recoil'

import { SEARCH_RESULT, APP_MESSAGE } from 'store/keys'

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

// ? Message
const appMessageState = atom<{ [id: number]: any }>({
  key: APP_MESSAGE,
  default: {},
})

export default {
  searchResultState,
  appMessageState,
}
