import React from 'react'

import * as Routes from 'routes'

import { RouteConfig } from 'hooks/usePrefetch'

const AuthLayout = () => import(/* webpackChunkName: "AuthLayout" */ 'pages/Auth/AuthLayout')
const SignInDrawer = () => import(/* webpackChunkName: "SignInDrawer" */ 'pages/Auth/SignInDrawer')

const Home = () => import(/* webpackChunkName: "Home" */ 'pages/NotFound')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ 'pages/NotFound')

export const routeMap: Array<RouteConfig & { Component: React.LazyExoticComponent<any> }> = [
  {
    path: Routes.HOME,
    Component: React.lazy(Home),
    relatedRoutes: [SignInDrawer, NotFound],
  },
  {
    path: Routes.NOTFOUND,
    Component: React.lazy(NotFound),
    relatedRoutes: [AuthLayout, SignInDrawer, Home],
  },
]
