import React, { memo } from 'react'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'
import { Drawer } from 'antd'
import { Transition, animated } from 'react-spring/renderprops'

import Avatar from 'components/Avatar'
import Follow from 'components/Follow'
import { Spacing } from 'components/Layout'
import { A } from 'components/Text'

import { useStore } from 'store'
import { CLOSE_FOLLOW_DRAWER } from 'store/follow'

import * as Routes from 'routes'

const List = styled.ul`
  padding: 0;
  padding-top: ${(p) => p.theme.spacing.xs};
  margin-bottom: 0;
`

const ListItem = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(p) => p.theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }
`

const AnimatedListItem = animated(ListItem)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const FullName = styled.div`
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => (p.active ? p.theme.colors.primary.main : p.theme.colors.text.primary)};
`

const UserName = styled.div`
  color: ${(p) => p.theme.colors.text.hint};
  font-size: ${(p) => p.theme.font.size.tiny};
  line-height: 1;
`

const FollowedUsersDrawer = memo(() => {
  const [{ follow }, dispatch] = useStore()

  return (
    <Drawer
      visible={follow.isDrawerVisible}
      title={`${follow.following.count} Following`}
      placement='right'
      closable
      width={350}
      bodyStyle={{ overflowX: 'hidden', overflowY: 'scroll', boxSizing: 'border-box' }}
      onClose={() => dispatch({ type: CLOSE_FOLLOW_DRAWER })}
    >
      <List>
        <Transition
          items={follow.followed.users}
          keys={(user) => user.id}
          trail={100}
          from={{ opacity: 0, transform: 'translate3d(30px, 0, 0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
          leave={{ opacity: 0, transform: 'translate3d(30px, 0, 0)' }}
        >
          {(user) => (props) => {
            const pathToProfile = generatePath(Routes.USER_PROFILE, {
              username: user.username,
            })

            return (
              <AnimatedListItem key={user.id} style={props}>
                <Container>
                  <A to={pathToProfile}>
                    <Avatar image={user.image} />
                  </A>

                  <Spacing left='xs'>
                    <A to={pathToProfile}>
                      <FullName>{user.fullName}</FullName>
                      <UserName>@{user.username}</UserName>
                    </A>
                  </Spacing>
                </Container>

                <Follow user={user} />
              </AnimatedListItem>
            )
          }}
        </Transition>
      </List>
    </Drawer>
  )
})

export default FollowedUsersDrawer
