import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'

import SideBar from './SideBar'
import Header from './Header'
// import ListUser from './ListChat'
// import UserSuggestions from './UserSuggestions'
// import MessageBox from 'components/MessageBox'

// import { GET_FOLLOWED_USERS } from 'graphql/follow'

// import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
// import Explore from 'pages/Explore'
// import Notifications from 'pages/Notifications'
// import People from 'pages/People'
// import Post from 'pages/Post'
// import Profile from 'pages/Profile'
// import Messages from 'pages/Messages'

// import FollowedUsersDrawer from './FollowedUsersDrawer'

// import { useWindowSize } from 'hooks/useWindowSize'
// import { useClickOutside } from 'hooks/useClickOutside'

// import { SET_FOLLOW } from 'store/follow'

import * as Routes from 'routes'

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.grey[200]};
  scroll-behavior: smooth;
`

const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.screen.xxl};
  position: relative;
  display: flex;
  margin: 0 auto;
`

const Body = styled.div`
  width: 100%;
  position: relative;
`

const Main = styled.div`
  width: 100%;
  position: relative;
  padding: ${(props) => props.theme.spacing.sm} 0 0 ${(props) => props.theme.spacing.sm};
`

const AppLayout = () => {
  return (
    <>
      <Background>
        <Container>
          <SideBar />

          <Body>
            <Header />

            <Main>
              <Switch>
                <Route exact path={Routes.HOME} component={NotFound} />

                {/* <Route exact path={Routes.EXPLORE} component={Explore} /> */}

                {/* <Route exact path={Routes.NOTIFICATIONS} component={Notifications} /> */}

                {/* <Route exact path={Routes.MESSAGES} component={Messages} /> */}

                {/* <Route exact path={Routes.PEOPLE} component={People} /> */}

                {/* <Route exact path={Routes.POST} component={Post} /> */}

                {/* <Route exact path={Routes.USER_PROFILE} component={Profile} /> */}

                <Route path={Routes.NOTFOUND} component={NotFound} />

                <Redirect to={Routes.NOTFOUND} />
              </Switch>
            </Main>
          </Body>
        </Container>
      </Background>
    </>
  )
}

export default AppLayout
