import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Search from 'components/Search'
import { useScrollPosition } from 'hooks/useScrollPosition'

import * as Routes from 'routes'

// import { Spacing } from 'components/Layout'
// import Avatar from 'components/Avatar'
// import { Button } from 'components/Form'
// import HeaderDropDowns from './HeaderDropDowns'

// import { useClickOutside } from 'hooks/useClickOutside'

// import SiteInfo from 'constants/SiteInfo.json'

type ContainerProps = {
  rising: boolean
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 15px -20px ${(props) => (props.rising ? props.theme.colors.grey[400] : 'transparent')};
  padding: ${(props) => props.theme.spacing.sm};
  z-index: ${(props) => props.theme.zIndex.md};
  background-color: ${(props) => props.theme.colors.grey[props.rising ? 200 : 200]};
  transition: 0.3s;
`

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`

// const WrapperMore = styled.div`
//   cursor: pointer;
//   padding: 12px;
// `

// const More = styled.div`
//   width: 0;
//   height: 0;
//   border-top: 6px solid ${(p) => p.theme.colors.grey[400]};
//   border-right: 6px solid transparent;
//   border-left: 6px solid transparent;

// `

// const Logo = styled(A)`
//   display: none;
//   font-weight: ${(p) => p.theme.font.weight.bold};
//   font-size: ${(p) => p.theme.font.size.sm};
//   color: ${(p) => p.theme.colors.primary.main};

//   &:hover {
//     color: ${(p) => p.theme.colors.primary.main};
//   }

//   @media (min-width: ${(p) => p.theme.screen.md}) {
//     display: block;
//   }
// `

// const RightSide = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `

// const NotificationCount = styled.span`
//   width: 22px;
//   height: 22px;
//   position: absolute;
//   top: -6px;
//   right: 54px;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   border-radius: 50%;
//   padding: 2px;
//   background-color: ${(p) => p.theme.colors.error.main};
//   font-size: ${(p) => p.theme.font.size.xxs};
//   letter-spacing: -1px;
//   color: ${(p) => p.theme.colors.white};
// `

// const MessageCount = styled.span`
//   ${countCSS};
//   right: 100px;
// `

const Header = (props: Props) => {
  const [rising, setRising] = React.useState(false)

  useScrollPosition({
    useWindow: true,
    effect: ({ currentPosition }) => {
      if (currentPosition.y > 60 && !rising) {
        setRising(true)
      } else if (currentPosition.y < 60 && rising) {
        setRising(false)
      }
    },
    waitMs: 200,
  })

  return (
    <Container rising={rising}>
      <LeftSide>
        <Search />
      </LeftSide>

      {/* <RightSide>
          <Spacing right='md'>
            <Button ghost onClick={() => handleIconClick('MESSAGE')}>
              {auth.user?.newConversations?.length > 0 && (
                <MessageCount>{auth.user.newConversations.length}</MessageCount>
              )}

              <EnvelopeOpenIcon />
            </Button>
          </Spacing>

          <Spacing right='md'>
            <Button ghost onClick={() => handleIconClick('NOTIFICATION')}>
              {auth.user?.newNotifications?.length > 0 && (
                <NotificationCount>{auth.user.newNotifications.length}</NotificationCount>
              )}
              <NotificationIcon />
            </Button>
          </Spacing>

          <Avatar image={auth.user.image} />

          <WrapperMore onClick={() => handleIconClick('USER')}>
            <More />
          </WrapperMore>
        </RightSide> */}

      {/* <HeaderDropDowns
          messageRef={messageRef}
          notificationRef={notificationRef}
          userRef={userRef}
          dropdownOpen={dropdownOpen}
          dropdownData={dropdownData}
          closeDropDown={closeDropDown}
        /> */}
    </Container>
  )
}

const componentPropTypes = {
  toggleSideBar: PropTypes.func,
}

Header.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Header
