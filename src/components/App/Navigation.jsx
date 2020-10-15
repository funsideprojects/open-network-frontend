import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import * as Routes from 'routes'

// import {
//   ExploreIcon,
//   NotificationIcon,
//   HomeIcon,
//   PeopleIcon,
//   EnvelopeIcon,
// } from 'components/icons'

import homeIcon from 'assets/images/svg/sidebar/home.svg'
import exploreIcon from 'assets/images/svg/sidebar/explore.svg'
import peopleIcon from 'assets/images/svg/sidebar/people.svg'

const Link = styled(NavLink)`
  text-decoration: none;
  transition: color 0.1s;
  color: ${(p) => p.theme.colors.text.primary};
  display: block;
  padding-left: 24px;

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[50]};
    color: ${(p) => p.theme.colors.primary.main};
  }

  &.selected {
    color: ${(p) => p.theme.colors.primary.main};
    background-color: ${(p) => p.theme.colors.grey[200]};

    svg path {
      fill: ${(p) => p.theme.colors.primary.main};
    }

    @media (min-width: ${(p) => p.theme.screen.md}) {
      background-color: ${(p) => p.theme.colors.grey[60]};
    }
  }
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  line-height: 40px;
  font-size: ${(p) => p.theme.font.size.xs};
`

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Name = styled.div`
  margin-left: ${(p) => p.theme.spacing.sm};
`

/**
 * Navigation component used in SideBar
 */
const Navigation = () => {
  return (
    <List>
      <Link exact activeClassName='selected' to={Routes.HOME}>
        <ListItem>
          <img src={homeIcon} alt='home' />
          <Name>Home</Name>
        </ListItem>
      </Link>

      <Link exact activeClassName='selected' to={Routes.EXPLORE}>
        <ListItem>
          <img src={exploreIcon} alt='home' />
          <Name>Explore</Name>
        </ListItem>
      </Link>

      <Link exact activeClassName='selected' to={Routes.PEOPLE}>
        <ListItem>
          <img src={peopleIcon} alt='home' />
          <Name>People</Name>
        </ListItem>
      </Link>
      {/* <Link exact activeClassName='selected' to={Routes.PEOPLE}>
        <ListItem>
          <img src={imageIcon} alt='home' />
          <Name>Images</Name>
        </ListItem>
      </Link> */}
      {/*
      <Link exact activeClassName='selected' to={Routes.NOTIFICATIONS}>
        <ListItem>
          <NotificationIcon width={18} />
          <Name>Notifications</Name>
        </ListItem>
      </Link>

      <Link
        exact
        activeClassName='selected'
        to={generatePath(Routes.MESSAGES, { userId: Routes.NEW_ID_VALUE })}
      >
        <ListItem>
          <EnvelopeIcon width={18} />
          <Name>Messages</Name>
        </ListItem>
      </Link> */}
    </List>
  )
}

export default Navigation
