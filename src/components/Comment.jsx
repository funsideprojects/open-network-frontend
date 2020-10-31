import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'
import { Mutation } from '@apollo/client/react/components'
import { Menu, Dropdown, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { getImageLink } from 'utils/image-link'

import { DotsIcon } from 'components/icons'
import { A, Username } from './Text'
import Avatar from 'components/Avatar'
import EditComment from 'components/EditComment'

import { DELETE_COMMENT } from 'graphql/comment'

import { timeAgo } from 'utils/date'

import { useStore } from 'store'
import * as Routes from 'routes'
import theme from 'theme'

import timeIcon from 'assets/images/svg/comment/time.svg'

const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${(p) => p.theme.spacing.xxs} 0;
  font-size: ${(p) => p.theme.font.size.xxs};
`

const CommentSection = styled.div`
  position: relative;
  word-wrap: break-word;
  overflow: hidden;
  padding: 0 ${(p) => p.theme.spacing.lg} ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.xs};
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.radius.lg};
  border-top-right-radius: 0;
  color: ${(p) => p.theme.colors.text.main};
`

const Section = styled.div`
  display: flex;
  align-items: center;
`

const ButtonOption = styled.button`
  cursor: pointer;
  display: block;
  background-color: transparent;
  border: 0;
  padding: 0px 6px;
  outline: 0;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
  transition: all ${(p) => p.theme.transition.duration} ease-in-out;

  hover {
    opacity: 1;
  }
`

const Item = styled.div`
  ${(p) => p.danger && `color: ${p.theme.colors.error.main};`}
  font-size: 12px;
`

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CommentText = styled.span`
  white-space: pre-wrap;
  word-break: break-all;
`

const TimeAgo = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  font-size: 12px;
  color: ${(p) => p.theme.colors.grey[700]};
  margin-left: 12px;

  span {
    margin-left: 6px;
  }
`

const WrapperImage = styled.div`
  user-select: none;
  width: 100%;
  height: auto;
  margin-top: ${(p) => p.theme.spacing.xs};
  position: relative;
`

const Image = styled.img`
  width: 100%;
  border-radius: ${(p) => p.theme.radius.md};
`

const Comment = ({
  comment,
  postAuthor,
  refetchPost,
  refetchComments,
  refetchGetUserPosts,
  refetchGetPostFromFollowedUsers,
}) => {
  const [{ auth }] = useStore()
  const [isEditing, setIsEditing] = useState(false)

  const handleDeleteComment = async (deleteComment) => {
    await deleteComment()

    if (typeof refetchPost === 'function') refetchPost()
    if (typeof refetchComments === 'function') refetchComments(-1)
    if (typeof refetchGetUserPosts === 'function') refetchGetUserPosts()
    if (typeof refetchGetPostFromFollowedUsers === 'function') refetchGetPostFromFollowedUsers()
  }

  const OnMenuItemClick = ({ key }, deleteComment) => {
    switch (key) {
      case 'EDIT': {
        setIsEditing(true)

        break
      }

      case 'DELETE': {
        handleDeleteComment(deleteComment)

        break
      }

      default:
    }
  }

  const editable = comment.author.id === auth.user.id

  const pathToProfile = generatePath(Routes.USER_PROFILE, {
    username: comment.author.username,
  })

  const isEdited = comment.createdAt !== comment.updatedAt

  const renderCommentText = () => {
    if (editable)
      return (
        <CommentContainer>
          {comment.comment ? (
            <Tooltip title={<span style={{ fontSize: '12px' }}>Double click to edit</span>}>
              <CommentText style={{ cursor: 'pointer' }} onDoubleClick={() => setIsEditing(true)}>
                {comment.comment}
              </CommentText>
            </Tooltip>
          ) : (
            <Fragment />
          )}

          {comment.image ? (
            <WrapperImage>
              <Image src={getImageLink(comment.image)} alt={comment.toString()} />
            </WrapperImage>
          ) : (
            <Fragment />
          )}
        </CommentContainer>
      )
    else return <CommentText>{comment.comment}</CommentText>
  }

  return (
    <Mutation mutation={DELETE_COMMENT} variables={{ input: { id: comment.id } }}>
      {(deleteComment) => {
        return (
          <Root>
            <A to={pathToProfile}>
              <Avatar image={comment.author.image} size={36} />
            </A>

            <CommentSection>
              <Section>
                <Username to={pathToProfile} weight="bold">
                  {comment.author.fullName}
                </Username>

                <TimeAgo>
                  <img src={timeIcon} alt="icon_item" />
                  <span>
                    {isEdited ? 'Edited' : ''} {timeAgo(isEdited ? comment.updatedAt : comment.createdAt)}
                  </span>
                </TimeAgo>
              </Section>

              <Section>
                {!isEditing ? (
                  <>{renderCommentText()}</>
                ) : (
                  <EditComment
                    comment={comment}
                    setIsEditing={setIsEditing}
                    refetchPost={refetchPost}
                    refetchComments={refetchComments}
                  />
                )}

                {(editable || postAuthor.id === auth.user.id) && (
                  <Dropdown
                    overlay={
                      <Menu onClick={(e) => OnMenuItemClick(e, deleteComment)}>
                        {editable && (
                          <Menu.Item key="EDIT">
                            <Item>
                              <EditOutlined /> Edit
                            </Item>
                          </Menu.Item>
                        )}

                        <Menu.Item key="DELETE">
                          <Item danger>
                            <DeleteOutlined color={theme.colors.error.main} /> Delete
                          </Item>
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <ButtonOption>
                      <DotsIcon width="14" />
                    </ButtonOption>
                  </Dropdown>
                )}
              </Section>
            </CommentSection>
          </Root>
        )
      }}
    </Mutation>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  postAuthor: PropTypes.object.isRequired,

  refetchPost: PropTypes.func,
  refetchComments: PropTypes.func,
  refetchGetUserPosts: PropTypes.func,
  refetchGetPostFromFollowedUsers: PropTypes.func,
}

export default Comment
