import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'

import { A } from 'components/Text'
import Avatar from 'components/Avatar'
import ButtonFollow from 'components/ButtonFollow'

import * as Routes from 'routes'

const Link = styled(A)`
  width: fit-content;
  max-width: 100%;
  overflow: hidden !important;
  text-overflow: ellipsis;
`

const TextContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  padding-left: ${(props) => props.theme.spacing.xs};
`

const Text = styled.span<{ bold?: boolean; small?: boolean; fade?: boolean }>`
  max-width: 100%;
  overflow: hidden !important;
  margin-bottom: 2px;
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-size: ${(props) => (props.small ? '0.8' : '0.9')}rem;
  line-height: 1.5;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: ${(props) => props.theme.colors.text[props.fade ? 'secondary' : 'primary']};
`

export const Component = ({ id, fullName, username, image, online }: Props) => {
  const userProfileLink = generatePath(Routes.USER_PROFILE_PATH, { username })

  return (
    <React.Fragment>
      <Link to={userProfileLink}>
        <Avatar size="40px" image={image} username={username} online={online} />
      </Link>

      <TextContainer>
        <Link to={userProfileLink}>
          <Text bold>{fullName}</Text>
        </Link>
        <Text small fade>
          @{username}
        </Text>
      </TextContainer>

      <ButtonFollow userId={id} />
    </React.Fragment>
  )
}

const componentPropTypes = {
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string,
  online: PropTypes.bool.isRequired,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Component
