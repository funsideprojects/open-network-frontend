import React from 'react'
import styled, { css } from 'styled-components'
import { generatePath } from 'react-router-dom'
import PropTypes from 'prop-types'

import SignOut from 'components/App/SignOut'
import { A } from 'components/Text'

import { useStore } from 'store'
import { OPEN_FOLLOWED_DRAWER } from 'store/follow'

import * as Routes from 'routes'

const Root = styled.div`
  width: 240px;
  position: absolute;
  background-color: white;
  border-radius: ${(p) => p.theme.radius.md};
  line-height: ${(p) => p.theme.spacing.md};
  right: 0;
  top: 64px;
  z-index: ${(p) => p.theme.zIndex.xl};
  box-shadow: ${(p) => p.theme.shadows.md};
  overflow: hidden;
`

const CSS = css`
  transition: background-color 0.4s;
  display: block;
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.xl};
  color: ${(p) => p.theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[50]};
    color: ${(p) => p.theme.colors.text.secondary};
  }
`

const Link = styled(A)`
  ${CSS};
`

const Item = styled.div`
  ${CSS};
`

const ItemNoSpacing = styled.div`
  ${CSS};
  padding: 0px;
`

/**
 * Component that renders Header User's dropdown
 */
const HeaderUserDropDown = ({ userRef }) => {
  const [{ auth }, dispatch] = useStore()

  return (
    <Root ref={userRef}>
      <Link
        to={generatePath(Routes.USER_PROFILE, {
          username: auth.user.username,
        })}
      >
        My Profile
      </Link>

      <Item onClick={() => dispatch({ type: OPEN_FOLLOWED_DRAWER })}>
        Following
      </Item>

      <ItemNoSpacing>
        <SignOut />
      </ItemNoSpacing>
    </Root>
  )
}

HeaderUserDropDown.propTypes = {
  userRef: PropTypes.object,
}

export default HeaderUserDropDown
