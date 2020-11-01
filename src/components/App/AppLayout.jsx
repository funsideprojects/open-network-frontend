import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, matchPath, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import NotificationComponent from 'react-notifications-component'

import Header from 'components/App/Header'
import NotFound from 'components/NotFound'
import SideBar from './SideBar'
import ListUser from './ListChat'
import UserSuggestions from './UserSuggestions'
import MessageBox from 'components/MessageBox'

import { GET_FOLLOWED_USERS } from 'graphql/follow'

import Explore from 'pages/Explore'
import Home from 'pages/Home'
import Notifications from 'pages/Notifications'
import People from 'pages/People'
import Post from 'pages/Post'
import Profile from 'pages/Profile'
// import Messages from 'pages/Messages'

import NotificationSubscription from './NotificationSubscription'
import FollowedUsersDrawer from './FollowedUsersDrawer'

import { useWindowSize } from 'hooks/useWindowSize'
import { useClickOutside } from 'hooks/useClickOutside'

import { useStore } from 'store'
import { SET_AUTH_USER } from 'store/auth'
import { SET_FOLLOW } from 'store/follow'

import * as Routes from 'routes'

import theme from 'theme'

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }

  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + 'px'}) {
    width: ${(p) => p.theme.screen.lg};
  }
`

const SessionLeft = styled.div`
  width: 280px;
  height: calc(100vh - 64px);
  background: #fff;
  position: sticky;
  top: 64px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const SessionRight = styled.div`
  width: 280px;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  z-index: 10;
`

const SessionContent = styled.div`
  width: ${(p) => (p.hideChat ? 'calc(100% - 280px)' : 'calc(100% - 560px)')};
  height: auto;
`

const AppLayout = ({ location, authUser }) => {
  const client = useApolloClient()
  const [{ auth }, dispatch] = useStore()

  //
  const windowSize = useWindowSize()
  const isDesktop = windowSize.width >= parseInt(theme.screen.md, 10)
  const [isSideBarOpen, setIsSidebarOpen] = useState(isDesktop)

  const sideBarRef = useRef('')

  useEffect(() => {
    dispatch({ type: SET_AUTH_USER, payload: authUser })
  }, [dispatch, authUser])

  useEffect(() => {
    client
      .query({ query: GET_FOLLOWED_USERS, fetchPolicy: 'no-cache' })
      .then(({ data }) => {
        dispatch({ type: SET_FOLLOW, payload: data.getFollowedUsers })
      })
      .catch(() => {})
  }, [client, dispatch])

  useClickOutside(sideBarRef, () => {
    if (!isDesktop && isSideBarOpen) {
      setIsSidebarOpen(false)
    }
  })

  useEffect(() => {
    setIsSidebarOpen(isDesktop)
  }, [isDesktop])

  useEffect(() => {
    return () => {
      if (!isDesktop) {
        setIsSidebarOpen(false)
      }
    }
  }, [location.pathname, isDesktop])

  if (!auth.user) return null

  const hideChat = matchPath(location.pathname, {
    path: [Routes.MESSAGES, Routes.PEOPLE, Routes.EXPLORE, Routes.USER_PROFILE],
  })

  return (
    <>
      <Header toggleSideBar={() => setIsSidebarOpen(!isSideBarOpen)} />

      {authUser && <NotificationSubscription />}

      <NotificationComponent />

      <Root>
        <SessionLeft>
          <SideBar isOpen={isSideBarOpen} sideBarRef={sideBarRef} />
          <UserSuggestions pathname={location.pathname} />
        </SessionLeft>

        <SessionContent hideChat={hideChat}>
          <Switch>
            {/* <Route exact path={Routes.HOME} component={Home} /> */}

            {/* <Route exact path={Routes.EXPLORE} component={Explore} /> */}

            {/* <Route exact path={Routes.NOTIFICATIONS} component={Notifications} /> */}

            {/* <Route exact path={Routes.MESSAGES} component={Messages} /> */}

            {/* <Route exact path={Routes.PEOPLE} component={People} /> */}

            {/* <Route exact path={Routes.POST} component={Post} /> */}

            {/* <Route exact path={Routes.USER_PROFILE} component={Profile} /> */}

            <Route component={NotFound} />
          </Switch>
        </SessionContent>

        {/* {!hideChat ? (
          <SessionRight>
            <ListUser pathname={location.pathname} />
            {chat.isShowMessageBox ? <MessageBox /> : <React.Fragment />}
          </SessionRight>
        ) : (
          <React.Fragment />
        )} */}

        <FollowedUsersDrawer />
      </Root>
    </>
  )
}

AppLayout.propTypes = {
  location: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
}

export default withRouter(AppLayout)
