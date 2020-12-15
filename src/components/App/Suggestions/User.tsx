import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'

import { A } from 'components/Text'
import Avatar from 'components/Avatar'
import ButtonFollow from 'components/ButtonFollow'

import * as Routes from 'routes'

const Container = styled.div<{ delay: number }>`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  transition-delay: ${(props) => props.delay}ms;

  &:last-child {
    margin-bottom: 0;
  }
`

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
  margin-bottom: 3px;
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-size: ${(props) => (props.small ? '0.8' : '0.9')}rem;
  line-height: 1;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.text[props.fade ? 'secondary' : 'primary']};
`

export const User = ({ itemIndex, user }: Props) => {
  const userProfileLink = generatePath(Routes.USER_PROFILE_PATH, { username: user.username })

  return (
    <Container delay={500 + itemIndex * 100}>
      <Link to={userProfileLink}>
        <Avatar size="40px" image={user.image} username={user.username} online />
      </Link>

      <TextContainer>
        <Link to={userProfileLink}>
          <Text bold>{user.fullName}</Text>
        </Link>
        <Text small fade>
          @{user.username}
        </Text>
      </TextContainer>

      <ButtonFollow userId={user.id} />
    </Container>
  )
}

const componentPropTypes = {
  itemIndex: PropTypes.number,
  user: PropTypes.exact({
    id: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
}

User.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default User
