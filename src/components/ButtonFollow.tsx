import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import indexOf from 'lodash/indexOf'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import { AddCircle, CloseCircle } from '@styled-icons/ionicons-outline'

import { Button } from 'components/Form'
import { CREATE_FOLLOW, DELETE_FOLLOW, GET_FOLLOWING_IDS } from 'graphql/follow'
import { followAtoms } from 'store'

const ButtonFollow = styled(Button)`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.round};
  margin-left: ${(props) => props.theme.spacing.xs};
  padding: 0;
`

const SCIAddCircle = styled(AddCircle)``
const SCICloseCircle = styled(CloseCircle)``

const Component = ({ userId }: Props) => {
  const followingIds = useRecoilValue(followAtoms.followingIdsState)
  const isFollowing = indexOf(followingIds, userId) > -1
  const [createOrDeleteFollow, { loading }] = useMutation(isFollowing ? DELETE_FOLLOW : CREATE_FOLLOW, {
    refetchQueries: [GET_FOLLOWING_IDS.name],
    awaitRefetchQueries: true,
  })

  const handleOnClick = () => {
    createOrDeleteFollow({ variables: { input: { userId } } })
  }

  return (
    <ButtonFollow
      buttonType={isFollowing ? 'text' : 'primary'}
      icon={isFollowing ? SCICloseCircle : SCIAddCircle}
      loading={loading}
      onClick={handleOnClick}
    />
  )
}

const componentPropTypes = {
  userId: PropTypes.string.isRequired,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default React.memo(Component)
