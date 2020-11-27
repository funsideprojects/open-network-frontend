import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
// import { useApolloClient } from '@apollo/client'
import styled from 'styled-components'

// import Header from 'components/App/Header'
import NotFound from 'pages/NotFound'
// import SideBar from './SideBar'
// import ListUser from './ListChat'
// import UserSuggestions from './UserSuggestions'
// import MessageBox from 'components/MessageBox'

// import { GET_FOLLOWED_USERS } from 'graphql/follow'

// import Explore from 'pages/Explore'
// import Home from 'pages/Home'
// import Notifications from 'pages/Notifications'
// import People from 'pages/People'
// import Post from 'pages/Post'
// import Profile from 'pages/Profile'
// import Messages from 'pages/Messages'

import Subscription from './Subscription'
// import FollowedUsersDrawer from './FollowedUsersDrawer'

// import { useWindowSize } from 'hooks/useWindowSize'
// import { useClickOutside } from 'hooks/useClickOutside'

import { useStore } from 'store'
import { SET_AUTH_USER } from 'store/auth'
// import { SET_FOLLOW } from 'store/follow'

import * as Routes from 'routes'

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.grey[200]};
`

const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.screen.xxl};
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  display: flex;
  margin: 0 auto;
`

const AppLayout = ({ authUser }: AppLayoutPropTypes) => {
  // const client = useApolloClient()
  const [, dispatch] = useStore()

  React.useEffect(() => {
    console.log('trig')
    dispatch({ type: SET_AUTH_USER, payload: authUser })
  }, [dispatch, authUser])

  // React.useEffect(() => {
  //   client
  //     .query({ query: GET_FOLLOWED_USERS, fetchPolicy: 'no-cache' })
  //     .then(({ data }) => {
  //       dispatch({ type: SET_FOLLOW, payload: data.getFollowedUsers })
  //     })
  //     .catch(() => {})
  // }, [client, dispatch])

  // useClickOutside(sideBarRef, () => {
  //   if (!isDesktop && isSideBarOpen) {
  //     setIsSidebarOpen(false)
  //   }
  // })

  console.log('renderx')

  return (
    <>
      <Subscription />

      {/* <Header toggleSideBar={() => setIsSidebarOpen(!isSideBarOpen)} /> */}

      <Background>
        <Container>
          {/* <SessionLeft>
          <SideBar isOpen={isSideBarOpen} sideBarRef={sideBarRef} />
          <UserSuggestions pathname={location.pathname} />
        </SessionLeft> */}

          <Switch>
            {/* <Route exact path={Routes.HOME} component={Home} /> */}

            {/* <Route exact path={Routes.EXPLORE} component={Explore} /> */}

            {/* <Route exact path={Routes.NOTIFICATIONS} component={Notifications} /> */}

            {/* <Route exact path={Routes.MESSAGES} component={Messages} /> */}

            {/* <Route exact path={Routes.PEOPLE} component={People} /> */}

            {/* <Route exact path={Routes.POST} component={Post} /> */}

            {/* <Route exact path={Routes.USER_PROFILE} component={Profile} /> */}

            <Route path={Routes.NOTFOUND} component={NotFound} />

            <Redirect to={Routes.NOTFOUND} />
          </Switch>
        </Container>
      </Background>
    </>
  )
}

const appLayoutPropTypes = {
  authUser: PropTypes.object.isRequired,
}

AppLayout.propTypes = appLayoutPropTypes
type AppLayoutPropTypes = PropTypes.InferProps<typeof appLayoutPropTypes>

export default AppLayout
