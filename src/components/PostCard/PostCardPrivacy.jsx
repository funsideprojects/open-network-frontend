import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'
import { Select } from 'antd'

import { PublicIcon, PrivateIcon, LoadingIcon } from 'components/icons'

import { UPDATE_POST } from 'graphql/post'

const { Option } = Select

const StyledSelect = styled(Select)`
  > .ant-select-selector {
    height: 20px !important;

    input {
      height: 20px !important;
    }

    > .ant-select-selection-item {
      line-height: 20px !important;
      font-size: 12px;
    }
  }
`

const ButtonPrivacy = styled.div`
  cursor: pointer;
  border: 0;
  border-radius: ${(p) => p.theme.radius.sm};
  padding: 0 3px;
  background: transparent;
  border-radius: 2px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background: ${(p) => p.theme.colors.grey[200]};
  }
`

const PrivacySelectionText = styled.span`
  margin-left: 8px;
`

const PostCardPrivacy = ({
  postId,
  isPostBelongsToAuthUser,
  isPrivate,
  refetchPost,
  getUserPosts = false,
  refetchGetPostFromFollowedUsers,
}) => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [isEditingPrivacy, setIsEditingPrivacy] = useState(false)

  const updatePostPrivacy = async (selected) => {
    setLoading(true)
    return await client
      .mutate({
        mutation: UPDATE_POST,
        variables: { input: { id: postId, isPrivate: selected } },
        refetchQueries: () => [...(getUserPosts ? [`getUserPosts`] : [])],
      })
      .then(async () => {
        if (typeof refetchPost === 'function') await refetchPost()
        if (typeof refetchGetPostFromFollowedUsers === 'function') refetchGetPostFromFollowedUsers()
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
        setIsEditingPrivacy(false)
      })
  }

  if (!isPostBelongsToAuthUser) {
    return <>{isPrivate ? <PrivateIcon withTooltip='Private' /> : <PublicIcon withTooltip='Public' />}</>
  }

  if (loading) return <LoadingIcon />

  if (isEditingPrivacy) {
    return (
      <StyledSelect
        defaultOpen={isEditingPrivacy}
        autoFocus={isEditingPrivacy}
        defaultValue={isPrivate}
        onChange={(selected) => updatePostPrivacy(selected)}
        onDropdownVisibleChange={() => setIsEditingPrivacy(false)}
      >
        <Option value={false}>
          <PublicIcon />
          <PrivacySelectionText>Everyone</PrivacySelectionText>
        </Option>
        <Option value={true}>
          <PrivateIcon />
          <PrivacySelectionText>Only Me</PrivacySelectionText>
        </Option>
      </StyledSelect>
    )
  }

  return (
    <ButtonPrivacy onClick={(e) => setIsEditingPrivacy(true)}>
      {isPrivate ? <PrivateIcon withTooltip='Private' /> : <PublicIcon withTooltip='Public' />}
    </ButtonPrivacy>
  )
}

PostCardPrivacy.propTypes = {
  postId: PropTypes.string.isRequired,
  isPostBelongsToAuthUser: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,

  refetchPost: PropTypes.func,
  getUserPosts: PropTypes.bool,
  getPostsFromFollowedUsers: PropTypes.bool,
}

export default PostCardPrivacy
