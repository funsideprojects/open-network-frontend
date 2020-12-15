import { atomFamily, atom } from 'recoil'

import { FOLLOW_STATE_FAMILY, FOLLOWING_IDS } from 'store/keys'

export enum FollowType {
  Following = 'following',
  Follower = 'follower',
}

const defaultFollowState = {
  offset: 0,
  limit: 0,
  result: {
    count: undefined,
    users: undefined,
  },
}

const followStateFamily = atomFamily<typeof defaultFollowState, FollowType>({
  key: FOLLOW_STATE_FAMILY,
  default: defaultFollowState,
})

const followingIdsState = atom<Array<string>>({
  key: FOLLOWING_IDS,
  default: [],
})

export default {
  followStateFamily,
  followingIdsState,
}
