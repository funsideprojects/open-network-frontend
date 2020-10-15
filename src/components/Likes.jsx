import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'

import { A } from 'components/Text'
import Avatar from 'components/Avatar'
import Follow from 'components/Follow'
import Modal from 'components/Modal'

import { useStore } from 'store'

import * as Routes from 'routes'

const LikesButton = styled.div`
  ${(p) =>
    p.clickable
      ? `
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
      : `
  pointer-events: none;
`};

  user-select: none;
  font-size: ${(p) => p.theme.font.size.xxs};
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  min-height: 400px;
  overflow: scroll;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.radius.sm};
  z-index: ${(p) => p.theme.zIndex.lg};
  box-shadow: ${(p) => p.theme.shadows.xl};
  padding: 20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 5px 4px;
  border: 0;
  border-style: solid;
  border-color: ${(p) => p.theme.colors.border.dark};
  border-bottom-width: 1px;
`

const UserInfo = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const UserFullName = styled.span`
  margin-left: 5px;
`

const Likes = ({ likeCount, likes, getPostsFromFollowedUsers = false }) => {
  const [{ auth }] = useStore()
  const [isModalOpen, setIsModelOpen] = useState(false)

  const openModal = () => setIsModelOpen(true)
  const closeModal = () => setIsModelOpen(false)

  return (
    <Fragment>
      <Modal onClose={closeModal} open={isModalOpen}>
        <ModalContent>
          {likes.map(({ user }) => {
            const pathToProfile = generatePath(Routes.USER_PROFILE, { username: user.username })
            return (
              <Row key={user.id}>
                <UserInfo>
                  <A to={pathToProfile}>
                    <Avatar image={user.image} isOnline={user.isOnline} />
                  </A>
                  <A to={pathToProfile}>
                    <UserFullName>
                      {user.fullName}
                      {auth.user.id === user.id && ' (You)'}
                    </UserFullName>
                  </A>
                </UserInfo>
                {auth.user.id !== user.id && (
                  <Follow user={user} getPostsFromFollowedUsers={getPostsFromFollowedUsers} />
                )}
              </Row>
            )
          })}
        </ModalContent>
      </Modal>

      <LikesButton onClick={openModal} clickable={!!likeCount}>
        {likeCount} like{likeCount > 1 ? `s` : ''}
      </LikesButton>
    </Fragment>
  )
}

Likes.propTypes = {
  likeCount: PropTypes.number.isRequired,
  likes: PropTypes.array.isRequired,

  getPostsFromFollowedUsers: PropTypes.bool,
}

export default Likes
