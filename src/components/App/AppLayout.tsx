import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'

import { usePrefetch } from 'hooks/usePrefetch'

import Messages from './Messages'
import SideBar from './SideBar'
import Header from './Header'
import Chats from './Chats'
import Suggestions from './Suggestions'
import { routeMap } from './routeMap'
// import ListUser from './ListChat'
// import UserSuggestions from './UserSuggestions'
// import MessageBox from 'components/MessageBox'

// import Home from 'pages/Home'
// import Explore from 'pages/Explore'
// import Notifications from 'pages/Notifications'
// import People from 'pages/People'
// import Post from 'pages/Post'
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
  display: flex;
  padding: ${(props) => props.theme.spacing.sm} 0 0 ${(props) => props.theme.spacing.sm};
`

const PageContainer = styled.div`
  position: relative;
  flex: 1;
`

const AppLayout = () => {
  usePrefetch(routeMap, 500)

  return (
    <React.Fragment>
      <Messages />

      <Background>
        <Container>
          <SideBar />

          <Body>
            <Header />

            <Main>
              <Chats />
              <Suggestions />

              <PageContainer>
                <Switch>
                  {routeMap.map(({ relatedRoutes, Component, ...restRouteProps }, index) => (
                    <Route key={index} exact strict {...restRouteProps} component={Component} />
                  ))}

                  <Redirect to={Routes.NOTFOUND} />
                </Switch>
              </PageContainer>
            </Main>
          </Body>
        </Container>
      </Background>
    </React.Fragment>
  )
}

export default AppLayout
