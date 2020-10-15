import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Button, Tooltip } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { Transition, animated, config } from 'react-spring/renderprops'

import { UserSuggestionSkeleton } from 'components/Skeletons/UserSuggestionsSkeleton'
import Avatar from 'components/Avatar'
import Follow from 'components/Follow'
import { Spacing } from 'components/Layout'
import { H3, A } from 'components/Text'

import { USER_SUGGESTIONS } from 'graphql/user'

import * as Routes from 'routes'

const Root = styled.div`
  height: auto;
  display: none;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.radius.sm};
  padding: ${(p) => p.theme.spacing.sm};

  @media (min-width: ${(p) => p.theme.screen.md}) {
    display: block;
  }
`

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(p) => p.theme.spacing.xs};
`

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
  padding: ${(p) => p.theme.spacing.xxs} 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const FullName = styled.div`
  width: 120px;
  font-size: 13px;
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => (p.active ? p.theme.colors.primary.main : p.theme.colors.text.primary)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserName = styled.div`
  width: 100px;
  color: ${(p) => p.theme.colors.grey[600]};
  font-size: ${(p) => p.theme.font.size.xxs};
  line-height: 1;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ReloadButton = styled(Button)`
  width: 28px;
  height: 28px;
  border: 0;
  box-shadow: none;
  border-radius: 50%;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[100]};
  }
`

const UserSuggestions = ({ pathname }) => {
  const [buttonLoading, setButtonLoading] = useState(false)

  return (
    <Query query={USER_SUGGESTIONS} fetchPolicy='no-cache'>
      {({ data, loading, refetch }) => {
        if (loading)
          return (
            <Root>
              <UserSuggestionSkeleton />
            </Root>
          )

        if (!data.suggestPeople.length) return null

        return (
          <Root>
            <TopRow>
              <H3>Suggestions For You</H3>

              <ReloadButton
                disabled={buttonLoading}
                onClick={() => {
                  setButtonLoading(true)
                  refetch().finally(() => setButtonLoading(false))
                }}
              >
                <ReloadOutlined spin={buttonLoading} />
              </ReloadButton>
            </TopRow>

            <List>
              <Transition
                native
                items={data.suggestPeople}
                keys={(user) => user.id}
                from={{ opacity: 0, transform: 'translate3d(30px, 0, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(0, 0, 0)' }}
                config={(item, state) => (state === 'leave' ? { duration: 0 } : config.default)}
              >
                {(user) => (props) => {
                  const pathToProfile = generatePath(Routes.USER_PROFILE, {
                    username: user.username,
                  })

                  return (
                    <AnimatedListItem key={user.id} style={props}>
                      <Container>
                        <A to={pathToProfile}>
                          <Avatar image={user.image} size={42} />
                        </A>

                        <Spacing left='xs'>
                          <A to={pathToProfile}>
                            <Tooltip title={user.fullName} placement='topLeft'>
                              <FullName>{user.fullName}</FullName>
                            </Tooltip>

                            <Tooltip title={`@${user.username}`} placement='topLeft'>
                              <UserName>@{user.username}</UserName>
                            </Tooltip>
                          </A>
                        </Spacing>
                      </Container>

                      <Follow user={user} />
                    </AnimatedListItem>
                  )
                }}
              </Transition>
            </List>
          </Root>
        )
      }}
    </Query>
  )
}

UserSuggestions.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default UserSuggestions
