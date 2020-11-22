import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'

import { CookieEvents } from './CookieEvents'

// import Header from 'components/App/Header'
import NotFound from 'components/NotFound'
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

// import NotificationSubscription from './NotificationSubscription'
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
  overflow-x: hidden;
  position: relative;
  background-color: ${(props) => props.theme.colors.grey[200]};
`

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0 auto;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }

  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + 'px'}) {
    width: ${(p) => p.theme.screen.lg};
  }
`

// const SessionLeft = styled.div`
//   width: 280px;
//   height: calc(100vh - 64px);
//   overflow-y: auto;
//   position: sticky;
//   top: 64px;
//   background: #fff;

//   ::-webkit-scrollbar {
//     display: none;
//   }
// `

// const SessionRight = styled.div`
//   width: 280px;
//   height: calc(100vh - 64px);
//   position: sticky;
//   top: 64px;
//   z-index: 10;
// `

const SessionContent = styled.div`
  width: 100%;
  height: auto;
`

const AppLayout = ({ authUser }: AppLayoutPropTypes) => {
  const history = useHistory()
  const client = useApolloClient()
  const [{ auth }, dispatch] = useStore()

  // const sideBarRef = React.useRef(null)

  React.useEffect(() => {
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

  if (!auth.user) {
    return <div>asdasdasd</div>
  }

  return (
    <>
      <CookieEvents />

      <Background>
        {/* {authUser && <NotificationSubscription />} */}

        {/* <Header toggleSideBar={() => setIsSidebarOpen(!isSideBarOpen)} /> */}

        <Root>
          {/* <SessionLeft>
          <SideBar isOpen={isSideBarOpen} sideBarRef={sideBarRef} />
          <UserSuggestions pathname={location.pathname} />
        </SessionLeft> */}

          <SessionContent>
            <Switch>
              {/* <Route exact path={Routes.HOME} component={Home} /> */}

              {/* <Route exact path={Routes.EXPLORE} component={Explore} /> */}

              {/* <Route exact path={Routes.NOTIFICATIONS} component={Notifications} /> */}

              {/* <Route exact path={Routes.MESSAGES} component={Messages} /> */}

              {/* <Route exact path={Routes.PEOPLE} component={People} /> */}

              {/* <Route exact path={Routes.POST} component={Post} /> */}

              {/* <Route exact path={Routes.USER_PROFILE} component={Profile} /> */}

              <Route path={Routes.NOTFOUND} render={() => <NotFound navigate={() => history.push(Routes.HOME)} />} />

              <Redirect to={Routes.NOTFOUND} />
            </Switch>
          </SessionContent>
        </Root>
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
