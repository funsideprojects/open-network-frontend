import React from 'react'

import * as Routes from 'routes'

import { RouteConfig } from 'hooks/usePrefetch'

const Home = () => import(/* webpackChunkName: "Home" */ 'pages/Home')
const Profile = () => import(/* webpackChunkName: "Profile" */ 'pages/Profile')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ 'pages/NotFound')

export const routeMap: Array<RouteConfig & { Component: React.LazyExoticComponent<any> }> = [
  {
    path: Routes.HOME,
    Component: React.lazy(Home),
    relatedRoutes: [NotFound, Profile],
  },
  {
    path: [Routes.USER_PROFILE, Routes.USER_PROFILE_PATH],
    Component: React.lazy(Profile),
    relatedRoutes: [Home, NotFound],
  },
  {
    path: Routes.NOTFOUND,
    Component: React.lazy(NotFound),
    relatedRoutes: [Home],
  },
]
