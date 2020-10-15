import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  NotificationIcon,
} from 'components/icons'

import Notification from '../Notification'

const Root = styled.div`
  position: absolute;
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  background-color: white;
  right: 0;
  top: 64px;
  z-index: ${(p) => p.theme.zIndex.xl};
  box-shadow: ${(p) => p.theme.shadows.sm};
  border-radius: ${(p) => p.theme.radius.md};

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    width: 420px;
    right: ${(p) => p.theme.spacing.lg};
  }
`

const HeaderNotification = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px ${(p) => p.theme.spacing.sm};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};

  span {
    font-size: ${(p) => p.theme.font.size.sm};
  }
`

const UnRead = styled.div`
  padding: 2px 6px;
  border-radius: ${(p) => p.theme.radius.md};
  background-color: ${(p) => p.theme.colors.error.main};
  color: ${(p) => p.theme.colors.white};
`


const Empty = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(p) => p.theme.spacing.xs};
`

/**
 * Component that renders Header Notification's dropdown
 */
const HeaderNotificationDropDown = ({
  notificationRef,
  dropdownData,
  closeDropDown,
}) => {
 
  return (
    <Root ref={notificationRef}>
      <HeaderNotification>
        <NotificationIcon size={18} />
        <span>Notifications</span>
        <UnRead>4</UnRead>
      </HeaderNotification>
      {!dropdownData?.length ? (
        <Empty>No new notifications.</Empty>
      ) : (
        dropdownData.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            close={closeDropDown}
          />
        ))
      )}
    </Root>
  )
}

HeaderNotificationDropDown.propTypes = {
  notificationRef: PropTypes.object,
  dropdownData: PropTypes.array,
  closeDropDown: PropTypes.func,
}

export default HeaderNotificationDropDown
