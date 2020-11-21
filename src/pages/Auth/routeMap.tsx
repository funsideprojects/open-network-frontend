import React from 'react'

import * as Routes from 'routes'

import { RouteConfig } from 'hooks/usePrefetch'

const WelcomeDrawer = () => import(/* webpackChunkName: "WelcomeDrawer" */ './WelcomeDrawer')
const SignInDrawer = () => import(/* webpackChunkName: "SignInDrawer" */ './SignInDrawer')
const SignUpDrawer = () => import(/* webpackChunkName: "SignUpDrawer" */ './SignUpDrawer')
const RequestPasswordResetDrawer = () =>
  import(/* webpackChunkName: "RequestPasswordResetDrawer" */ './RequestPasswordResetDrawer')
const ResetPasswordDrawer = () => import(/* webpackChunkName: "ResetPasswordDrawer" */ './ResetPasswordDrawer')

export const routeMap: Array<RouteConfig & { Component: React.LazyExoticComponent<any> }> = [
  {
    path: Routes.HOME,
    Component: React.lazy(WelcomeDrawer),
    relatedRoutes: [SignUpDrawer, SignInDrawer],
  },
  {
    path: Routes.SIGN_UP,
    Component: React.lazy(SignUpDrawer),
    relatedRoutes: [WelcomeDrawer, SignInDrawer],
  },
  {
    path: Routes.SIGN_IN,
    Component: React.lazy(SignInDrawer),
    relatedRoutes: [WelcomeDrawer, RequestPasswordResetDrawer, SignUpDrawer],
  },
  {
    path: [Routes.FORGOT_PASSWORD, Routes.FORGOT_PASSWORD_PATH],
    Component: React.lazy(RequestPasswordResetDrawer),
    relatedRoutes: [WelcomeDrawer, SignInDrawer],
  },
  {
    path: [Routes.RESET_PASSWORD, Routes.RESET_PASSWORD_PATH],
    Component: React.lazy(ResetPasswordDrawer),
    relatedRoutes: [WelcomeDrawer, SignInDrawer],
  },
]
