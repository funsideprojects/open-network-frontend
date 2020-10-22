import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip } from 'antd'

import { useStore } from 'store'

// import { SET_CHAT } from 'store/messenger'

import Avatar from 'components/Avatar'
import { Spacing } from 'components/Layout'
import { H3 } from 'components/Text'

const Root = styled.div`
  height: calc(100vh - 64px);
  display: none;
  background-color: ${(p) => p.theme.colors.white};
  border-bottom-left-radius: ${(p) => p.theme.radius.lg};
  border-bottom-right-radius: ${(p) => p.theme.radius.lg};
  position: sticky;
  right: 0;
  overflow: hidden;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    display: block;
  }
`

const TopRow = styled.div`
  margin-top: ${(p) => p.theme.spacing.xs};
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.sm};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const List = styled.ul`
  width: 100%;
  height: calc(100% - 72px);
  overflow: auto;
  padding: 0;
  margin-bottom: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    &::-webkit-scrollbar {
      display: block;
    }
  }
`

const Container = styled.div`
  width: 100%;
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.sm};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[50]};
  }
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

const Unread = styled.span`
  display: block;
  padding: 1px 6px;
  background-color: ${(p) => p.theme.colors.error.main};
  border-radius: ${(p) => p.theme.radius.md};
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.font.size.xxs};
`

const WrapperInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

/**
 * Displays user suggestions
 */
const ListChat = memo(({ pathname }) => {
  // eslint-disable-next-line no-unused-vars
  const [{ chat }, dispatch] = useStore()

  const openMessageBox = () => {
    // dispatch({
    //   type: SET_CHAT,
    //   payload: {
    //     isShowMessageBox: true,
    //     infoUser: null,
    //   },
    // })
  }

  return (
    <Root>
      <TopRow>
        <H3>Chat</H3>
      </TopRow>

      <List>
        {Array(10)
          .fill(1)
          .map((item, index) => {
            return (
              <Container key={index} onClick={openMessageBox}>
                <WrapperInfo>
                  <Avatar size={42} isOnline={true} />

                  <Spacing left='xs'>
                    <Tooltip title='User'>
                      <FullName>User</FullName>
                    </Tooltip>

                    <Tooltip title={`@user`}>
                      <UserName>@user</UserName>
                    </Tooltip>
                  </Spacing>
                </WrapperInfo>

                <Unread>3</Unread>
              </Container>
            )
          })}
      </List>
    </Root>
  )
})

ListChat.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default ListChat
